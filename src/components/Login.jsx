import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthProvider";
import Loader from "./common/Loader";

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin, isLoading, setLogin, login, Error, isValidate } =
    useAuthProvider();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      {console.log(login.email, isValidate)}
      <div className="h-screen w-full flex justify-center items-center bg-amber-500">
        <div className="max-w-lg w-full bg-white rounded-lg p-5 sm:p-10">
          <h1 className="text-black text-lg font-medium text-center mb-4">
            LOGIN to NODE + REACT APP
          </h1>
          <input
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            value={login.email}
            type="email"
            placeholder="Enter your Email..."
            className="bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          {/* IF EMAIL LENGTH IS 0 AND IS VALIDATE IS FALSE THEN SHOW */}
          {!login.email.length > 0 && !isValidate ? (
            <span className="text-red-500">Please fill your email</span>
          ) : (
            <>
              {login.email.length > 0 ? (
                <span className="text-red-500">
                  {validateEmail(login.email) !== null
                    ? ""
                    : "Your email is not valid"}
                </span>
              ) : (
                ""
              )}
            </>
          )}
          <input
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            value={login.password}
            type="password"
            placeholder="*********"
            className="my-3 bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />

          {/* IF EMAIL LENGTH IS 0 AND IS VALIDATE IS FALSE THEN SHOW */}
          {!login.password.length > 0 && !isValidate ? (
            <span className="text-red-500">Please fill your password</span>
          ) : (
            ""
          )}
          {Error !== "" && <span className="text-red-500">{Error}</span>}

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear"
          >
            {isLoading ? <Loader /> : "LOGIN"}
          </button>
          <p
            onClick={() => navigate("/signup")}
            className="mt-5  text-amber-600 hover:text-amber-400 cursor-pointer transition-all duration-200 ease-linear"
          >
            DON'T HAVE AN ACCOUNT? CLICK HERE TO SIGNUP.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
