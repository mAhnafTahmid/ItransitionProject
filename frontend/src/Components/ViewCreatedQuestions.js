import React, { useState } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";

const ViewCreatedQuestions = () => {
  const { questions, setQuestions } = useQuestionsContext();
  const [accessListInput, setAccessListInput] = useState("");

  const handleQuestionChange = (field, value) => {
    setQuestions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditAccessList = () => {
    const updatedList = accessListInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    handleQuestionChange("accessList", updatedList);
  };

  const renderQuestion = (type, num) => {
    const stateKey = `${type}${num}State`;
    const questionKey = `${type}${num}Question`;
    if (questions[stateKey]) {
      return (
        <div key={`${type}${num}`} className="my-5 w-full text-center">
          <label className="text-3xl text-yellow-300 block">Q:</label>
          <input
            type={"text"}
            value={questions[questionKey] || ""}
            onChange={(e) => handleQuestionChange(questionKey, e.target.value)}
            className="w-3/4 p-2 border rounded text-black bg-white"
          />
          {type === "checkbox" && (
            <div className="mt-3">
              {[1, 2, 3, 4].map((optNum) => {
                const optionKey = `${type}${num}Option${optNum}`;
                return (
                  questions[optionKey] && (
                    <div
                      key={optNum}
                      className="my-2 w-4/5 justify-center flex"
                    >
                      <input type="radio" id={optionKey} disabled />
                      <input
                        type="text"
                        value={questions[optionKey]}
                        onChange={(e) =>
                          handleQuestionChange(optionKey, e.target.value)
                        }
                        className="ml-2 p-1 border rounded text-black bg-white"
                      />
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full flex-wrap">
      <div className="w-full max-w-full lg:max-w-4xl overflow-hidden text-center">
        <h1 className="text-4xl text-red-500 pt-7 pb-5 px-7 break-words">
          Title:
          <input
            type="text"
            value={questions?.title || ""}
            onChange={(e) => handleQuestionChange("title", e.target.value)}
            className="ml-2 p-2 border rounded text-black bg-white"
          />
        </h1>
        <h1 className="text-4xl text-red-500 pt-7 pb-5 px-7 break-words">
          Description:
          <input
            type="text"
            value={questions?.description || ""}
            onChange={(e) =>
              handleQuestionChange("description", e.target.value)
            }
            className="ml-2 p-2 border rounded text-black bg-white"
          />
        </h1>
        <h1 className="text-4xl text-red-500 pt-7 pb-5 px-7">
          Topic:
          <input
            type="text"
            value={questions?.topic || ""}
            onChange={(e) => handleQuestionChange("topic", e.target.value)}
            className="ml-2 p-2 border rounded text-black bg-white"
          />
        </h1>
        <h1 className="text-4xl text-red-500 pt-7 pb-5 px-7">
          Visibility:
          <select
            value={questions?.isPublic ? "Public" : "Private"}
            onChange={(e) =>
              handleQuestionChange("isPublic", e.target.value === "Public")
            }
            className="ml-2 p-2 border rounded text-black bg-white"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </h1>
        <div className="p-5">
          <h1 className="text-4xl text-red-500 pt-7 pb-5">
            Access List:
            <span className="ml-2 text-white">
              {questions?.accessList?.$values?.join(", ") ||
                "No one has been given access"}
            </span>
          </h1>

          <input
            type="text"
            value={accessListInput}
            onChange={(e) => setAccessListInput(e.target.value)}
            className="p-2 border rounded text-black bg-white w-full mt-2"
            placeholder="Enter comma-separated email addresses"
          />

          <button
            onClick={handleEditAccessList}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Access List
          </button>
        </div>
      </div>

      {["string", "text", "int", "checkbox"].map((type) =>
        [1, 2, 3, 4].map((num) => renderQuestion(type, num))
      )}
    </div>
  );
};

export default ViewCreatedQuestions;
