import { useEffect, useState } from "react";
import axios from "axios";

const FlashcardList = () => {
  const [folders, setFolders] = useState([]);
  const [flashcardsByFolder, setFlashcardsByFolder] = useState({});

  useEffect(() => {
    // Fetch all folder names
    const fetchFolders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/flashcards/folders"
        );
        setFolders(res.data);
      } catch (err) {
        console.error("Error fetching folders", err);
      }
    };
    fetchFolders();
  }, []);

  useEffect(() => {
    // For each folder, fetch flashcards
    const fetchFlashcards = async () => {
      const results = {};
      for (const folder of folders) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/flashcards/folder/${folder}`
          );
          results[folder] = res.data;
        } catch (err) {
          console.error(`Error fetching flashcards for folder ${folder}`, err);
        }
      }
      setFlashcardsByFolder(results);
    };

    if (folders.length) fetchFlashcards();
  }, [folders]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {folders.map((folder) => (
        <div key={folder} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{folder}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {flashcardsByFolder[folder]?.map((card) => (
              <div key={card._id} className="border p-4 rounded shadow">
                {card.questionImage && (
                  <img
                    src={`http://localhost:5000/uploads/${card.questionImage}`}
                    alt="Question"
                    className="w-full h-40 object-contain mb-2"
                  />
                )}
                <p className="font-semibold mb-2">Q: {card.question}</p>
                {card.answerImage && (
                  <img
                    src={`http://localhost:5000/uploads/${card.answerImage}`}
                    alt="Answer"
                    className="w-full h-40 object-contain mb-2"
                  />
                )}
                <p className="text-gray-700">A: {card.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;
