import React, { useState } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";
import toast from "react-hot-toast";

const CreateIntQuestion = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const { questions, setQuestions, questionsCount, setQuestionsCount } =
    useQuestionsContext();

  const handleIntQuestion = () => {
    try {
      if (newQuestion !== "") {
        const intNumber = questionsCount.integer + 1;
        if (questionsCount.integer > 3) {
          toast.error("You can only add up to 4 single line questions");
          return;
        }
        const saveQuestion = {
          [`int${intNumber}State`]: true,
          [`int${intNumber}Question`]: newQuestion,
        };
        setQuestions((prevQuestions) => ({
          ...prevQuestions,
          ...saveQuestion,
        }));
        setNewQuestion("");
        setQuestionsCount((prev) => ({
          ...prev,
          integer: prev.integer + 1,
        }));
        toast.success("Your question was added successfully");
        console.log(questions);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error adding question", error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-20">
      <h1 className="text-2xl">Enter the integer question</h1>
      <input
        type="text"
        value={newQuestion}
        className="w-[95%] px-3 py-2 border border-gray-400 rounded mt-4 mx-[88px] hover:border-blue-500 bg-white text-black"
        onChange={(e) => setNewQuestion(e.target.value)}
      ></input>
      <button
        type="button"
        onClick={handleIntQuestion}
        className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600 mx-auto text-black"
      >
        Add Question
      </button>
    </div>
  );
};

export default CreateIntQuestion;
