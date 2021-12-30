import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { createDish, createDishVariables } from "../../../__generated__/createDish";
import { Button } from "../../../components/Button";
import { MY_RESTAURANTS_QUERY } from "../MyRestaurants";

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
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const { id } = useParams<keyof IParams>() as IParams;
  const navigate = useNavigate();

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

  const { register, handleSubmit, formState, getValues, setValue } = useForm<AddDishProps>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();

    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));

    createDishMutation({
      variables: {
        input: {
          restaurantId: +id,
          name,
          price: +price,
          description,
          options: optionObjects,
        },
      },
    });
    navigate(-1);
  };

  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));

    setValue(`${idToDelete}-optionName`, "");

    setValue(`${idToDelete}-optionExtra`, "");
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
            minLength: 5,
          })}
        />
        <div className="mt-8 mb-10">
          <h4 className="font-medium  mb-3 text-lg">Dish Options</h4>
          <span onClick={onAddOptionClick} className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-">
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5">
                <input
                  {...register(`${id}-optionName`, { minLength: 1 })}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`, {
                    minLength: 1,
                  })}
                  name={`${id}-optionExtra`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
          {/* className="ml-3 cursor-pointer text-sm" */}
        </div>
        <Button loading={loading} canClick={formState.isValid} actionText="Create Dish" buttonType="submit" />
      </form>
    </div>
  );
};
