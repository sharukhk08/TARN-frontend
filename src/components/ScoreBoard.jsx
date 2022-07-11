import React from "react";

const ScoreBoard = () => {
  return (
    <>
      <div className="max-w-xl w-full bg-white rounded-lg p-5 sm:p-6">
        <h1 className="text-xl font-bold mb-4">Score Board</h1>
        <ul className="max-h-64	 overflow-auto style-scrollbar pr-3">
          <ScoreBoardListItem />
          <ScoreBoardListItem />
          <ScoreBoardListItem />
          <ScoreBoardListItem />
          <ScoreBoardListItem />
          <ScoreBoardListItem />
          <ScoreBoardListItem />
        </ul>
      </div>
    </>
  );
};

export default ScoreBoard;

export function ScoreBoardListItem() {
  return (
    <>
      <li className="flex items-center justify-between py-3">
        <span className="text-md sm:text-lg text-black font-normal">
          11/07/2022
        </span>
        <span className="text-md sm:text-lg text-black font-bold">3</span>
      </li>
    </>
  );
}
