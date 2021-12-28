import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { createRestaurant } from "../../../__generated__/createRestaurant";
import { createAccountMutationVariables } from "../../../__generated__/createAccountMutation";
import { useForm } from "react-hook-form";
import { AddRestaurantForm } from "./type";
import { Button } from "../../../components/Button";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<createRestaurant, createAccountMutationVariables>(
    CREATE_RESTAURANT_MUTATION
  );
  const {
    register,
    getValues,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<AddRestaurantForm>({ mode: "onChange" });

  const onSubmit = () => {};

  return (
    <div className="container">
      <Helmet>
        <title>Create Restaurant | Giraffe</title>
      </Helmet>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          {...register("name", {
            required: "name is required",
          })}
          name="name"
          type="text"
          required
          placeholder="name"
        />
        <input
          className="input"
          {...register("address", {
            required: "name is required",
          })}
          name="address"
          type="text"
          required
          placeholder="address"
        />
        <input
          className="input"
          {...register("categoryName", {
            required: "name is required",
          })}
          name="categoryName"
          type="text"
          required
          placeholder="categoryName"
        />
        <Button canClick={formState.isValid} loading={loading} actionText="Create Restaurant" buttonType="submit" />
      </form>
    </div>
  );
};
