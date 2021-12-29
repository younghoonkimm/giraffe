import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { createDish, createDishVariables } from "../../../__generated__/createDish";
import { Button } from "../../../components/Button";
import { MY_RESTAURANTS_QUERY } from "../MyRestaurants";
import { myRestaurant, myRestaurantVariables } from "../../../__generated__/myRestaurant";
import { AddDishProps } from "./type";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const AddDish = () => {
  const { id } = useParams<keyof IParams>() as IParams;

  const [queryReadyToStart, { data: resData }] = useLazyQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANTS_QUERY
  );
  const [createDishMutation, { data, loading }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANTS_QUERY,
        variables: {
          input: {
            id,
          },
        },
      },
    ],
  });

  const { register, handleSubmit, formState, getValues } = useForm<AddDishProps>({
    mode: "onChange",
  });
  useEffect(() => {
    // if (id) {
    //   queryReadyToStart({
    //     variables: {
    //       input: {
    //         id: +id,
    //       },
    //     },
    //   });
    // }
  }, []);

  console.log(resData);

  const onSubmit = () => {
    const { name, price, description } = getValues();
    createDishMutation({
      variables: {
        input: {
          restaurantId: +id,
          name,
          price: +price,
          description,
        },
      },
    });
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
        <input
          className="input"
          type="text"
          placeholder="name"
          {...register("name", {
            required: "name is required",
            minLength: 2,
          })}
        />
        <input
          className="input"
          type="number"
          min={0}
          placeholder="price"
          {...register("price", {
            required: "number is required",
          })}
        />
        <input
          className="input"
          type="text"
          placeholder="description"
          {...register("description", {
            required: "description is required",
          })}
        />
        <Button loading={loading} canClick={formState.isValid} actionText="Create Dish" buttonType="submit" />
      </form>
    </div>
  );
};
