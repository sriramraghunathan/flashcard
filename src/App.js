import React, { useState } from "react";
import FlashcardSet from "./components/FlashcardSet";
import FlashcardList from "./components/FlashcardList";
const App = () => {
  const [sets, setSets] = useState([]);
  const [activeSet, setActiveSet] = useState(null);
  const [newSetName, setNewSetName] = useState("");

  const createSet = () => {
    if (newSetName.trim()) {
      setSets([...sets, { name: newSetName, flashcards: [] }]);
      setNewSetName("");
    }
  };

  const updateSetFlashcards = (setName, newFlashcards) => {
    setSets((prev) =>
      prev.map((s) =>
        s.name === setName ? { ...s, flashcards: newFlashcards } : s
      )
    );
  };

  return (
    <>
      <div>
        {/* other components */}
        <FlashcardList />
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        {!activeSet ? (
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Flashcard Folders</h1>
            <div className="flex gap-2 mb-4">
              <input
                value={newSetName}
                onChange={(e) => setNewSetName(e.target.value)}
                placeholder="New Subject"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={createSet}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <ul className="gap-10 grid grid-cols-3">
              {sets.map((set, idx) => (
                <li
                  key={idx}
                  onClick={() => setActiveSet(set.name)}
                  className="bg-white p-4 rounded shadow w-40 h-40 cursor-pointer hover:bg-yellow-100"
                >
                  {set.name} ({set.flashcards.length} cards)
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <FlashcardSet
            setName={activeSet}
            flashcards={
              sets.find((s) => s.name === activeSet)?.flashcards || []
            }
            onBack={() => setActiveSet(null)}
            onUpdate={(newFlashcards) =>
              updateSetFlashcards(activeSet, newFlashcards)
            }
          />
        )}
      </div>
    </>
  );
};

export default App;
