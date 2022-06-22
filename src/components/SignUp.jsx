import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-amber-500">
        <div className="max-w-lg w-full bg-white rounded-lg p-5 sm:p-10">
          <h1 className="text-black text-lg font-medium text-center mb-4">
            SIGNUP to NODE + REACT APP
          </h1>
          <input
            type="text"
            placeholder="Name"
            className="bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <input
            type="text"
            placeholder="Enter your Email..."
            className="mt-5 bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="*********"
            className="my-5 bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
          />
          <button className="w-full bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear">
            SIGN UP
          </button>
          <p
            onClick={() => navigate("/login")}
            className="mt-5  text-amber-600 hover:text-amber-400 cursor-pointer transition-all duration-200 ease-linear"
          >
            ALREADY HAVE AN ACCOUNT? CLICK HERE TO LOGIN.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
