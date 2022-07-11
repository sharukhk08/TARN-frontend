import React from "react";
import scoreicon from "../assets/images/scoreicon.svg";

const ShowScore = ({ score, initialState }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-5">Your score is {score}</h1>
        <img
          className="w-full max-w-sm min-h-min"
          src={scoreicon}
          alt="scoreicon"
        />
        <button
          onClick={initialState}
          className="bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear w-full mt-5"
        >
          Play again!
        </button>
      </div>
    </>
  );
};

export default ShowScore;
