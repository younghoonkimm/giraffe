import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useQuery } from "@apollo/client";

import { RESTAURANT_FRAGMENT } from "../../../fragment";
import { myRestaurants } from "../../../__generated__/myRestaurants";
import { Restaurant } from "../../../components/Restaurant";

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);

  return (
    <div className="wrapper">
      <Helmet>
        <title>My Restaurants | Giraffe</title>
      </Helmet>
      <div className="container">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link className="link" to="/add-restaurant">
              Create one &rarr;
            </Link>
          </>
        ) : (
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myRestaurants.restaurants?.map((restaurant) => (
              <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                <Restaurant
                  // id={restaurant.id + ""}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                  coverImg={restaurant.coverImg}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
