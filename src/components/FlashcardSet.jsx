import React, { useState } from "react";
import Flashcard from "./Flashcard";

const FlashcardSet = ({ setName, flashcards, onBack, onUpdate }) => {
  const [form, setForm] = useState({
    question: "",
    answer: "",
    questionImage: "",
    answerImage: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addFlashcard = () => {
    if (form.question && form.answer) {
      onUpdate([...flashcards, form]);
      setForm({ question: "", answer: "", questionImage: "", answerImage: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="text-black hover:underline border-blue-400 rounded-xl bg-blue-500 p-3 mb-4 inline-block"
      >
        ←Back to Folders
      </button>
      <h2 className="text-xl font-bold mb-4">{setName}</h2>
      <div className="grid gap-3 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Enter question"
          className="p-2 border rounded"
        />
        <div>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "questionImage")}
              className="hidden"
            />
          </label>
        </div>
        <input
          type="text"
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Enter answer"
          className="p-2 border rounded"
        />
        <div>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "answerImage")}
              className="hidden"
            />
          </label>
        </div>
        <button
          onClick={addFlashcard}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Flashcard
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {flashcards.map((card, idx) => (
          <Flashcard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
};

export default FlashcardSet;
