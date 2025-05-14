import React, { useState } from "react";

const Flashcard = ({ question, answer, color, fontSize, width, label }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className={`${width} p-6 m-4 bg-${color} rounded-lg shadow-md border cursor-pointer transition-transform transform hover:scale-105`}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      {label && (
        <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">
          {label}
        </span>
      )}
      <h2 className={`${fontSize} font-semibold text-center`}>
        {showAnswer ? answer : question}
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2">
        {showAnswer ? "Click to hide" : "Click to reveal"}
      </p>
    </div>
  );
};

export default Flashcard;
