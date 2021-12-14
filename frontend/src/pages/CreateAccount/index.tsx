import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Helmet from "react-helmet";

import FormError from "../../components/FormError";
import { CreateAccountForm } from "./type";
import { UserRole } from "../../__generated__/globalTypes";
import Logo from "../../images/logo.svg";

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

  // const onError = (error: ApolloError) => {};

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);

  const onSubmit = () => {};

  return (
    <div className="h-screen flex items-center flex-col lg:mt-28 mt-10">
      <Helmet>
        <title>Create Account | Giraffe</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img className="w-52 mb-10" src={Logo} alt="logo" />
        <h4 className="text-left w-full text-2xl font-medium">Let's get started</h4>
        <form className="grid gap-3 mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
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
          <button className="btn" type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
