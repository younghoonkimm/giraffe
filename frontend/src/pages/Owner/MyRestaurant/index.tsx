import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryTheme,
  VictoryLine,
} from "victory";

import { DISH_FRAGMENT, ORDERS_FRAGMENT, RESTAURANT_FRAGMENT } from "../../../fragment";
import { myRestaurant, myRestaurantVariables } from "../../../__generated__/myRestaurant";
import { Dish } from "../../../components/Dish";

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
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

export interface IParams {
  id: string;
}

const chartData = [
  { x: 1, y: 3000 },
  { x: 2, y: 1500 },
  { x: 3, y: 4250 },
  { x: 4, y: 1250 },
  { x: 5, y: 2300 },
  { x: 6, y: 7150 },
  { x: 7, y: 6830 },
  { x: 8, y: 6830 },
  { x: 9, y: 6830 },
  { x: 10, y: 6830 },
  { x: 11, y: 6830 },
];

export const MyRestaurant = () => {
  const { id } = useParams<keyof IParams>() as IParams;

  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  console.log(data?.myRestaurant.restaurant);

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
              ) : (
                <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                  {data?.myRestaurant.restaurant?.menu?.map((dish) => (
                    <Dish name={dish.name} description={dish.description} price={dish.price} key={dish.name} />
                  ))}
                </div>
              )}
            </div>
            <div className="mt-20 mb-10">
              <h4 className="text-center text-2xl font-medium">Sales</h4>
              <div className="w-full mx-auto">
                <VictoryChart
                  height={500}
                  theme={VictoryTheme.material}
                  width={window.innerWidth}
                  domainPadding={20}
                  containerComponent={<VictoryVoronoiContainer />}
                >
                  <VictoryLine
                    labels={({ datum }) => `$${datum.y}`}
                    labelComponent={
                      <VictoryTooltip style={{ fontSize: 18, fill: "#4d7c0f" } as any} renderInPortal dy={-20} />
                    }
                    data={
                      data?.myRestaurant.restaurant?.orders &&
                      data?.myRestaurant.restaurant?.orders.map((order) => ({
                        x: order.createdAt,
                        y: order.total,
                      }))
                    }
                    interpolation="natural"
                    style={{
                      data: {
                        strokeWidth: 5,
                      },
                    }}
                  />
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel renderInPortal />}
                    style={{
                      tickLabels: {
                        fontSize: 20,
                      } as any,
                    }}
                    tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
                  />
                </VictoryChart>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
