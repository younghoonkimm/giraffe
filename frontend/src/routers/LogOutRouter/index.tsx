import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useForm } from "react-hook-form";

import { isLoggedInVar } from "../../apollo";
import { LogOutForm } from "./type";
import Login from "../../pages/Login";
import CreateAccount from "../../pages/CreateAccount";

function LogOutRouter() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LogOutForm>();

  const onSubmit = () => {
    console.log(watch());
  };

  const onInvalid = () => {
    console.log(errors.email);
  };

  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    // <div>
    //   <h1>Logged Out</h1>
    //   <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
    //     <div>
    //       <input
    //         {...register("email", {
    //           required: "This is required",
    //           pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
    //         })}
    //         name="email"
    //         type="email"
    //         placeholder="email"
    //       />
    //       {errors.email?.message && <span className="font-bold text-red-600">{errors.email?.message}</span>}
    //       {errors.email?.type === "pattern" && <span className="font-bold text-red-600">Only gmail allowed</span>}
    //     </div>
    //     <div>
    //       <input
    //         {...register("password", {
    //           minLength: 5,
    //         })}
    //         name="password"
    //         type="password"
    //         required
    //         placeholder="password"
    //       />
    //     </div>
    //     <button className="bg-yellow-300 text-white">Submit</button>
    //   </form>
    // </div>
  );
}

export default LogOutRouter;
