import React from "react";
import QuizQuestion from "./QuizQuestion";

const Quiz = () => {
  const [question, setQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [questions, setQuestions] = React.useState([
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
      question: "What is the capital of Germany?",
      answers: [
        { text: "Paris", correct: false },
        { text: "London", correct: false },
        { text: "Berlin", correct: true },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "What is the capital of Italy?",
      answers: [
        { text: "Paris", correct: false },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: true },
      ],
    },
  ]);

  return (
    <>
      <div className="max-w-xl w-full bg-white rounded-lg p-5 sm:p-6">
        {questions && questions[question] && (
          <QuizQuestion question={questions[question]} />
        )}
      </div>
    </>
  );
};

export default Quiz;
