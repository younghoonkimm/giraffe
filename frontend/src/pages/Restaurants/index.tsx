import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";

import Categories from "../../components/Categories";
import Restaurant from "../../components/Restaurant";
import { restaurantsPageQuery, restaurantsPageQueryVariables } from "../../__generated__/restaurantsPageQuery";

import { SearchFormProps } from "./type";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

const Restaurants = () => {
  const [page, setPages] = useState(1);
  const { register, handleSubmit, getValues } = useForm<SearchFormProps>();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onSearchSubmit = () => {
    const { searchText } = getValues();
    console.log(getValues());
    navigate({
      pathname: "search",
      search: `?${createSearchParams({
        searchText,
      })}`,
    });
  };

  const onNextPageClick = () => {
    setPages((current: number) => current + 1);
  };

  const onPrevPageClick = () => {
    setPages((current: number) => current - 1);
  };

  return (
    <div>
      <Helmet>
        <title>Home | NuerEats</title>
      </Helmet>
      <form
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <input
          className="input w-3/4 md:w-4/12 rounded-md border-0"
          type="search"
          placeholder="Search Restaurants"
          {...register("searchText", { required: true, min: 3 })}
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div key={category.id}>
                <Categories category={category} />
              </div>
            ))}
          </div>
          <div className="px-20">
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.restaurants.results?.map((restaurant) => (
                <div key={restaurant.id}>
                  <Restaurant
                    id={restaurant.id + ""}
                    name={restaurant.name}
                    categoryName={restaurant.category?.name}
                    coverImg={restaurant.coverImg}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button onClick={onPrevPageClick} className="focus:outline-none font-medium text-2xl">
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button onClick={onNextPageClick} className="focus:outline-none font-medium text-2xl">
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
