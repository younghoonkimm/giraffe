import React from "react";
import { isLoggedInVar } from "../apollo";
import { useForm } from "react-hook-form";

function LoggedOutRouter() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log(watch());
  };

  const onInvalid = () => {
    console.log("cant create account");
  };

  const onclick = () => {
    isLoggedInVar(true);
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input {...register("password")} name="password" type="password" required placeholder="password" />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
}

export default LoggedOutRouter;
