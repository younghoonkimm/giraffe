import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useForm } from "react-hook-form";

import { isLoggedInVar } from "../../apollo";
import Login from "../../pages/Login";
import CreateAccount from "../../pages/CreateAccount";

const LogOutRouter = () => {
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
    console.log(errors.email);
  };

  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default LogOutRouter;
