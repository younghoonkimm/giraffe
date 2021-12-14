import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Helmet from "react-helmet";

import FormError from "../../components/FormError";
import Button from "../../components/Button";
import { CreateAccountForm } from "./type";
import { UserRole } from "../../__generated__/globalTypes";
import Logo from "../../images/logo.svg";
import { createAccountMutation, createAccountMutationVariables } from "../../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

const CreateAccount = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const navigate = useNavigate();

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      navigate("/login");
    }
  };

  const [createAccountMutation, { data: createAccountMutationResult, loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
    console.log(getValues());
  };

  return (
    <div className="h-screen flex items-center flex-col lg:mt-28 mt-10">
      <Helmet>
        <title>Create Account | Giraffe</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img className="w-52 mb-10" src={Logo} alt="logo" />
        <h4 className="text-left w-full text-2xl font-medium">Let's get started</h4>
        <form className="grid gap-3 mt-5 mb-3 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            {...register("email", {
              required: "Email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          {errors.email?.type === "pattern" && <FormError errorMessage={"Please enter a valid email"} />}
          <input
            className="input"
            {...register("password", {
              required: "This is required",
              minLength: 10,
            })}
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 10 chars" />}
          <select {...register} className="input" name="role">
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button canClick={formState.isValid} loading={loading} actionText="Create Account" buttonType="submit" />
          {createAccountMutationResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutationResult?.createAccount.error} />
          )}
        </form>
      </div>
      <div>
        Already have an account?{" "}
        <Link to="/login" className="text-lime-600 hover:underline">
          Log in now
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
