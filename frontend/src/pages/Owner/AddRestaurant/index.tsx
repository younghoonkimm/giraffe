import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { createRestaurant, createRestaurantVariables } from "../../../__generated__/createRestaurant";
import { useForm } from "react-hook-form";
import { AddRestaurantForm } from "./type";
import { Button } from "../../../components/Button";
import { FormError } from "../../../components/FormError";
import { MY_RESTAURANTS_QUERY } from "../MyRestaurants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

export const AddRestaurant = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const client = useApolloClient();
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      navigate("/");
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<createRestaurant, createRestaurantVariables>(
    CREATE_RESTAURANT_MUTATION,
    {
      onCompleted,
      // refetchQueries: [{ query: MY_RESTAURANTS_QUERY }],
    }
  );

  const {
    register,
    getValues,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<AddRestaurantForm>({ mode: "onChange" });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();

      setImageUrl(coverImg);
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (e) {}
  };

  return (
    <div className="wrapper">
      <div className="container flex flex-col items-center mt-52">
        <Helmet>
          <title>Create Restaurant | Giraffe</title>
        </Helmet>
        <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
        <form className="form grid max-w-screen-sm gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            {...register("name", {
              required: "name is required",
              minLength: 2,
            })}
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
            type="text"
            required
            placeholder="categoryName"
          />
          <input type="file" accept="image/*" {...register("file", { required: true })} />
          <Button canClick={formState.isValid} loading={uploading} actionText="Create Restaurant" buttonType="submit" />
          {data?.createRestaurant?.error && <FormError errorMessage={data?.createRestaurant?.error} />}
        </form>
      </div>
    </div>
  );
};
