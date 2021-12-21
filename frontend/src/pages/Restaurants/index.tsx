import { gql, useMutation, useQuery } from "@apollo/client";
import Categories from "../../components/Categories";
import { restaurantsPageQuery, restaurantsPageQueryVariables } from "../../__generated__/restaurantsPageQuery";

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
  const { data, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input className="input w-4/12 rounded-md border-0" type="search" placeholder="Search Restaurants"></input>
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {/* {data?.allCategories.categories?.map((category) => (
              <Categories category={category} />
            ))} */}
          </div>
          <div className="px-20">
            <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
              {data?.restaurants.results?.map((restaurant) => (
                <div>
                  <div
                    style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                    className="bg-red-500 bg-cover bg-center mb-3 py-28"
                  ></div>
                  <h3 className="text-xl font-medium">{restaurant.name}</h3>
                  <span className="border-t-2 border-gray-200">{restaurant.category?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
