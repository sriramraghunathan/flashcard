import React, { useState } from "react";

const Flashcard = ({
  question,
  answer,
  questionImage,
  answerImage,
  color,
  fontSize,
  width,
  label,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className={`${width} p-6 m-4 bg-${color} rounded-lg shadow-md border cursor-pointer transition-transform transform hover:scale-105`}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      {label && (
        <span className="inline-block bg-white text-gray-700 text-xs px-2 py-1 rounded-full mb-2">
          {label}
        </span>
      )}
      <div className="flex flex-col items-center justify-center gap-2">
        {showAnswer ? (
          <>
            {answerImage && (
              <img
                src={answerImage}
                alt="Answer"
                className="max-h-40 object-contain"
              />
            )}
            <h2 className={`${fontSize} font-semibold text-center`}>
              {answer}
            </h2>
          </>
        ) : (
          <>
            {questionImage && (
              <img
                src={questionImage}
                alt="Question"
                className="max-h-40 object-contain"
              />
            )}
            <h2 className={`${fontSize} font-semibold text-center`}>
              {question}
            </h2>
          </>
        )}
      </div>
      <p className="text-sm text-gray-500 text-center mt-2">
        {showAnswer ? "Click to hide" : "Click to reveal"}
      </p>
    </div>
  );
};

export default Flashcard;
