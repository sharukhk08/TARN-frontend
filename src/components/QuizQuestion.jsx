import React from "react";
import QuizAnswerListItem from "./QuizAnswerListItem";

const QuizQuestion = ({
  setInCorrectChecked,
  inCorrectChecked,
  question,
  setScore,
}) => {
  return (
    <>
      <h2 className="text-black font-bold text-xl mb-4">{question.question}</h2>
      <form>
        {question.answers.map((ans, index) => (
          <QuizAnswerListItem
            setInCorrectChecked={setInCorrectChecked}
            inCorrectChecked={inCorrectChecked}
            setScore={setScore}
            ans={ans}
            question={question}
            key={index}
          />
        ))}
      </form>
    </>
  );
};

export default QuizQuestion;
