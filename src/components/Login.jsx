import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_API } from "../ApiServices";
import Loader from "./common/Loader";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(LOGIN_API, login)
      .then((res) => {
        localStorage.setItem("tarn-front-token", res.data.token);
        setLoading(false);
        setLogin(initialState);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            value={login.email}
            required
            type="text"
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
