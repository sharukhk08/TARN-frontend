import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import ShowScore from "./ShowScore";

const Quiz = () => {
  const [inCorrectChecked, setInCorrectChecked] = useState(false);
  const [isShowScore, setShowScore] = useState(false);
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "What is the capital of India?",
      answers: [
        { text: "Delhi", correct: true },
        { text: "Kolkata", correct: false },
        { text: "Hisar", correct: false },
        { text: "New Delhi", correct: false },
      ],
    },
    {
      question: "Sharukh is a?",
      answers: [
        { text: "Developer", correct: false },
        { text: "Designer", correct: false },
        { text: "Full Stack", correct: true },
        { text: "In me se koi nahi", correct: false },
      ],
    },
  ]);

  return (
    <>
      <div className="max-w-xl w-full bg-white rounded-lg p-5 sm:p-6">
        {isShowScore ? (
          <ShowScore score={score} />
        ) : (
          <>
            {questions && questions[question] && (
              <QuizQuestion
                setInCorrectChecked={setInCorrectChecked}
                inCorrectChecked={inCorrectChecked}
                setScore={setScore}
                question={questions[question]}
              />
            )}
            <div className="flex justify-end items-center mt-4">
              <button
                disabled={question === 0}
                onClick={() =>
                  question > 0 ? setQuestion((prev) => prev - 1) : null
                }
                className="bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear"
              >
                Prev
              </button>
              <button
                onClick={() => {
                  setInCorrectChecked(true);
                  questions.length !== question + 1
                    ? setQuestion((prev) => prev + 1)
                    : setShowScore(true);
                }}
                className="bg-amber-700 text-white px-6 py-2 rounded-sm hover:bg-amber-800 transition-all duration-300 ease-linear ml-3"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
