import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../../fragment";
import { myRestaurant, myRestaurantVariables } from "../../../__generated__/myRestaurant";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

export const MyRestaurant = () => {
  const params = useParams();
  const { id } = params;
  const [queryReadyToStart, { data, loading }] = useLazyQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY);

  useEffect(() => {
    if (id) {
      queryReadyToStart({
        variables: {
          input: {
            id: +id,
          },
        },
      });
    }
  }, []);

  return (
    <div>
      {data && (
        <>
          <div
            className="bg-gray-700  py-28 bg-center bg-cover"
            style={{
              backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
            }}
          ></div>
          <div className="wrapper container mt-10">
            <h2 className="text-4xl font-medium mb-10">{data?.myRestaurant.restaurant?.name || "Loading..."}</h2>
            <Link to={`/restaurants/${id}/add-dish`} className=" mr-8 text-white bg-gray-800 py-3 px-10">
              Add Dish &rarr;
            </Link>
            <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
              Buy Promotion &rarr;
            </Link>
            <div className="mt-10">
              {data?.myRestaurant.restaurant?.menu && data?.myRestaurant.restaurant?.menu.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a dish!</h4>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
