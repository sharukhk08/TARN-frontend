import React from "react";
import useQuiz from "../hooks/useQuiz";
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthProvider";
import { DateTime } from "luxon";

const ScoreBoard = () => {
  const navigate = useNavigate();
  const { user } = useAuthProvider();

  const { isLoading, scoreList } = useQuiz();
  return (
    <>
      <div className="max-w-xl w-full bg-white rounded-lg p-5 sm:p-6">
        <h1 className="text-xl font-bold mb-4"> {user.name}'s Score Board</h1>

        {isLoading ? (
          <div className="p-10">
            <Loader />
          </div>
        ) : (
          <ul className="max-h-64	 overflow-auto style-scrollbar pr-3">
            {scoreList && scoreList.length > 0 ? (
              scoreList.map((score, index) => (
                <ScoreBoardListItem score={score} key={index} />
              ))
            ) : (
              <div className="text-center p-10">
                <h1 className="text-md sm:text-lg text-black font-medium">
                  Play your first quiz to see the score board
                </h1>
                <button
                  onClick={() => navigate("/quiz")}
                  className="mt-4 bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear"
                >
                  PLAY
                </button>
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default ScoreBoard;

export function ScoreBoardListItem({ score }) {
  return (
    <>
      <li className="flex items-center justify-between py-3 hover:bg-slate-300 px-4 rounded-md">
        <span className="text-md sm:text-lg text-black font-normal">
          {DateTime.fromISO(score.created_at).toFormat("dd LLL yyyy")}
        </span>
        <span className="text-md sm:text-lg text-black font-bold">
          {score.score}
        </span>
      </li>
    </>
  );
}
