import React, { useState } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";
import toast from "react-hot-toast";

const CreateMcqQuestion = () => {
  const [options, setOptions] = useState(Array(4).fill(""));
  const [newQuestion, setNewQuestion] = useState("");
  const { setQuestions, questionsCount, setQuestionsCount } =
    useQuestionsContext();

  const handleCreateMCQ = () => {
    const checkboxNumber = questionsCount.mcq + 1;
    if (!newQuestion || options.some((option) => option.trim() === "")) {
      toast.error("Question and all options must be filled out");
      return;
    }
    if (questionsCount.mcq > 3) {
      toast.error("You can only add up to 4 MCQ questions");
      return;
    }
    const saveQuestion = {
      [`checkbox${checkboxNumber}State`]: true,
      [`checkbox${checkboxNumber}Question`]: newQuestion,
      [`checkbox${checkboxNumber}Option1`]: options[0] || "",
      [`checkbox${checkboxNumber}Option2`]: options[1] || "",
      [`checkbox${checkboxNumber}Option3`]: options[2] || "",
      [`checkbox${checkboxNumber}Option4`]: options[3] || "",
    };
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      ...saveQuestion,
    }));
    setNewQuestion("");
    setOptions(Array(4).fill(""));
    setQuestionsCount((prev) => ({
      ...prev,
      mcq: prev.mcq + 1,
    }));
    toast.success("Your question was added successfully");
    console.log("Saved Question:", saveQuestion);
  };

  const handleOptions = (index, value) => {
    let newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="w-full flex flex-col items-center mb-20">
      <h1 className="text-2xl">Enter the mcq question</h1>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        className="w-4/5 px-5 py-2 border border-gray-400 rounded mt-4 mx-20 hover:border-blue-500"
      />
      <div className="w-full mt-5 flex flex-col items-center">
        {options.map((option, index) => (
          <div key={index} className="mb-4 flex flex-col items-center w-full">
            <label className="w-full block mb-1 text-center">
              Enter option {index + 1}
            </label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptions(index, e.target.value)}
              className="w-3/5 px-5 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
            ></input>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleCreateMCQ}
        className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600 text-black"
      >
        Add Question
      </button>
    </div>
  );
};

export default CreateMcqQuestion;
