import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthProvider";
import Loader from "./common/Loader";

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin, isLoading, setLogin, login } = useAuthProvider();

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-amber-500">
        <form
          onSubmit={handleLogin}
          className="max-w-lg w-full bg-white rounded-lg p-5 sm:p-10"
        >
          <h1 className="text-black text-lg font-medium text-center mb-4">
            LOGIN to NODE + REACT APP
          </h1>
          <input
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            required
            type="email"
            placeholder="Enter your Email..."
            className="bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <input
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            value={login.password}
            required
            type="password"
            placeholder="*********"
            className="my-5 bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <button className="w-full bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear">
            {isLoading ? <Loader /> : "LOGIN"}
          </button>
          <p
            onClick={() => navigate("/signup")}
            className="mt-5  text-amber-600 hover:text-amber-400 cursor-pointer transition-all duration-200 ease-linear"
          >
            DON'T HAVE AN ACCOUNT? CLICK HERE TO SIGNUP.
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
