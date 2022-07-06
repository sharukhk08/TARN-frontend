import React from "react";

const QuizQuestion = ({ question }) => {
  console.log(question);
  return (
    <>
      <h2 className="text-black font-bold text-xl mb-4">{question.question}</h2>
      <form>
        {question.answers.map((ans) => (
          <div className="border px-5  py-4 rounded-sm mb-3">
            <label className="block text-md font-medium leading-5 text-gray-700">
              <input
                className="mr-3 leading-tight"
                type="radio"
                name="radio-quiz"
                value="1"
              />
              {ans.text}
            </label>
          </div>
        ))}
      </form>
    </>
  );
};

export default QuizQuestion;
