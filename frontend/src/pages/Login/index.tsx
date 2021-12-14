import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../../components/FormError";
import { LogOutForm } from "./type";
import { loginMutation, loginMutationVariables } from "../../__generated__/loginMutation";
import Logo from "../../images/logo.svg";

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
    <div className="h-screen flex items-center flex-col lg:mt-28 mt-10">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img className="w-52 mb-10" src={Logo} alt="logo" />
        <h4 className="text-left w-full text-2xl font-medium">Welcome back</h4>
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
