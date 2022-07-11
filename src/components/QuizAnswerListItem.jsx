import React, { useState, useEffect } from "react";

const QuizAnswerListItem = ({
  setInCorrectChecked,
  inCorrectChecked,
  setScore,
  ans,
  question,
}) => {
  const [isChecked, setChecked] = useState(false);

  function checkAnswer(e) {
    // setInCorrectChecked(false);
    for (let i = 0; i < question.answers.length; i++) {
      if (
        e.target.value === question.answers[i].text &&
        question.answers[i].correct
      ) {
        setScore((prev) => prev + 1);
      }
    }
  }

  useEffect(() => {
    setInCorrectChecked(false);
  }, [question]);

  useEffect(() => {
    if (inCorrectChecked) {
      setChecked(false);
    }
  }, [inCorrectChecked]);

  return (
    <>
      <div className="border px-5  py-4 rounded-sm mb-3">
        <label className="block text-md font-medium leading-5 text-gray-700">
          <input
            checked={isChecked}
            onChange={(e) => {
              checkAnswer(e);
              setChecked(e.target.checked);
            }}
            required
            className="mr-3 leading-tight"
            type="radio"
            name="radio-quiz"
            value={ans.text}
          />
          {ans.text}
        </label>
      </div>
    </>
  );
};

export default QuizAnswerListItem;
