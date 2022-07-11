import React from "react";
import scoreicon from "../assets/images/scoreicon.svg";

const ShowScore = ({ score }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-5">Your score is {score}</h1>
        <img className="w-full max-w-sm" src={scoreicon} alt="scoreicon" />
      </div>
    </>
  );
};

export default ShowScore;
