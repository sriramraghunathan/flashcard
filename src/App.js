import React, { useState } from "react";
import Flashcard from "./components/Flashcard";

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    color: "white",
    fontSize: "text-base",
    width: "w-72",
    label: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFlashcard = () => {
    if (form.question && form.answer) {
      setFlashcards([...flashcards, form]);
      setForm({
        question: "",
        answer: "",
        color: "white",
        fontSize: "text-base",
        width: "w-72",
        label: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto mb-6 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Create a Flashcard</h2>
        <div className="grid gap-3">
          <input
            type="text"
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Enter question"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Enter answer"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={handleChange}
            placeholder="Enter label (e.g. JavaScript)"
            className="p-2 border rounded"
          />
          <div className="flex gap-3">
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="white">White</option>
              <option value="blue-100">Blue</option>
              <option value="green-100">Green</option>
              <option value="yellow-100">Yellow</option>
              <option value="pink-100">Pink</option>
            </select>
            <select
              name="fontSize"
              value={form.fontSize}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="text-sm">Small</option>
              <option value="text-base">Base</option>
              <option value="text-lg">Large</option>
              <option value="text-xl">Extra Large</option>
            </select>
            <select
              name="width"
              value={form.width}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="w-64">Small</option>
              <option value="w-72">Medium</option>
              <option value="w-80">Large</option>
              <option value="w-96">XL</option>
            </select>
          </div>
          <button
            onClick={addFlashcard}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Flashcard
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {flashcards.map((card, idx) => (
          <Flashcard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
};

export default App;
