import { useState } from "react";
import axios from "axios";

const FlashcardForm = () => {
  const [folder, setFolder] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [answerImage, setAnswerImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("question", question);
    formData.append("answer", answer);
    if (questionImage) formData.append("questionImage", questionImage);
    if (answerImage) formData.append("answerImage", answerImage);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/flashcards/upload",
        formData
      );
      console.log("Flashcard created:", res.data);
    } catch (err) {
      console.error("Error uploading flashcard", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 border rounded shadow"
    >
      <input
        type="text"
        placeholder="Folder"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <label className="block">Question Image</label>
      <input
        type="file"
        onChange={(e) => setQuestionImage(e.target.files[0])}
        className="block w-full"
      />
      <label className="block">Answer Image</label>
      <input
        type="file"
        onChange={(e) => setAnswerImage(e.target.files[0])}
        className="block w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Create Flashcard
      </button>
    </form>
  );
};

export default FlashcardForm;
