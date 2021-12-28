import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { createRestaurant } from "../../../__generated__/createRestaurant";
import { createAccountMutationVariables } from "../../../__generated__/createAccountMutation";

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
  return <div className="container">add</div>;
};
