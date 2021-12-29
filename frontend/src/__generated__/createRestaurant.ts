/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurant
// ====================================================

export interface createRestaurant_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurantId: number;
}

export interface createRestaurant {
  createRestaurant: createRestaurant_createRestaurant;
}

export interface createRestaurantVariables {
  input: CreateRestaurantInput;
}
