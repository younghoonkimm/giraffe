import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { FormError } from "../../../components/FormError";
import { Button } from "../../../components/Button";
import { LogOutForm } from "./type";
import { loginMutation, loginMutationVariables } from "../../../__generated__/loginMutation";
import Logo from "../../../images/logo.svg";
import { authToken, isLoggedInVar } from "../../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../../constants";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<LogOutForm>({ mode: "onChange" });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;

    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<loginMutation, loginMutationVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();

      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col lg:mt-28 mt-10">
      <Helmet>
        <title>Login | Giraffe</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img className="w-52 mb-10" src={Logo} alt="logo" />
        <h4 className="text-left w-full text-2xl font-medium">Welcome back</h4>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            {...register("email", {
              required: "email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          {errors.email?.type === "pattern" && <FormError errorMessage="Please enter valid email" />}
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <input
            className="input"
            {...register("password", {
              required: "password is required",
              minLength: 10,
            })}
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 10 chars" />}
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          <Button canClick={formState.isValid} loading={loading} actionText="login" buttonType="submit" />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult?.login.error} />}
        </form>
        <div>
          New to Giraffe?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
