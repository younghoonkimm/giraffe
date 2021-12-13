import { useForm } from "react-hook-form";
import FormError from "../../components/FormError";
import { LogOutForm } from "./type";

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LogOutForm>();

  const onSubmit = () => {
    console.log(getValues());
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
