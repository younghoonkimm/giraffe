import { ApolloError, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../../components/FormError";
import { LogOutForm } from "./type";
import { loginMutation, loginMutationVariables } from "../../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LogOutForm>();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;

    if (ok) {
      console.log(token);
    }
  };

  // const onError = (error: ApolloError) => {};

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
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800">Log In</h3>
        <form className="grid gap-3 mt-5 px-5" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="btn" type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult?.login.error} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
