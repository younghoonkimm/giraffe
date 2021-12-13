import React from "react";

function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            className="bg-gray-100 mb-3 py-3 px-2 rounded-lg shadow-inner hover:bg-purple-600"
            placeholder="Email"
          />
          <input
            className="bg-gray-100 mb-3 py-3 px-2 rounded-lg shadow-inner hover:bg-purple-600"
            placeholder="Password"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
