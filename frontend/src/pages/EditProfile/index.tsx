import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { Button } from "../../components/Button";
import { useMe } from "../../hooks/useMe";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";
import { EditAccountForm } from "./type";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;

    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditUser on User {
              email
              verified
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
      //update cache
    }
  };
  const [editProfile, { loading }] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const { register, getValues, handleSubmit, formState } = useForm<EditAccountForm>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | NuerEats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit profile</h4>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            {...register("email", {
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            className="input"
            type="email"
            name="email"
            required
          />
          <input
            {...register("password", {
              minLength: 10,
            })}
            className="input"
            type="password"
            name="password"
          />
          <Button canClick={formState.isValid} loading={loading} actionText="Update Profile" buttonType="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
