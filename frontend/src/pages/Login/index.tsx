import React from "react";

function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input className="input mb-3" placeholder="Email" />
          <input className="input mb-3" placeholder="Password" />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
