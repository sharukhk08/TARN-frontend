import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_API } from "../ApiServices";
import Loader from "./common/Loader";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [signup, setSignup] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(SIGNUP_API, signup)
      .then((res) => {
        localStorage.setItem("tarn-front-token", res.data.token);
        setLoading(false);
        setSignup(initialState);
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
          className="max-w-lg w-full bg-white rounded-lg p-5 sm:p-10"
          onSubmit={handleSignup}
        >
          <h1 className="text-black text-lg font-medium text-center mb-4">
            SIGNUP to NODE + REACT APP
          </h1>
          <input
            onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            value={signup.name}
            required
            type="text"
            placeholder="Name"
            className="bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <input
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            value={signup.email}
            required
            type="email"
            placeholder="Enter your Email..."
            className="mt-5 bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <input
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            value={signup.password}
            required
            type="password"
            placeholder="*********"
            className="my-5 bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <button
            type="submit"
            className="h-12 flex items-center justify-center w-full bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear"
          >
            {isLoading ? <Loader /> : "SIGN UP"}
          </button>
          <p
            onClick={() => navigate("/login")}
            className="mt-5  text-amber-600 hover:text-amber-400 cursor-pointer transition-all duration-200 ease-linear"
          >
            ALREADY HAVE AN ACCOUNT? CLICK HERE TO LOGIN.
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
