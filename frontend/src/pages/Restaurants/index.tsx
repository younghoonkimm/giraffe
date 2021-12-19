import { gql, useMutation, useQuery } from "@apollo/client";
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
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center group cursor-pointer">
                <div
                  className="w-14 h-14 rounded-full bg-cover group-hover:bg-gray-200"
                  style={{ backgroundImage: category.coverImg ? `url(${category.coverImg})` : "#000" }}
                />
                <span className="mt-3 text-sm text-center font-medium" key={category.id}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
