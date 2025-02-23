import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ShowCreatedQuestions = () => {
  const { templateId } = useParams();
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/templets/templet/${templateId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json", // Ensure proper content type
          },
        });
        const data = await res.json();
        if (res.ok) {
          setQuestions(data);
          setAnswers(data.answers.$values);
        } else {
          toast.error(data.message || "Failed to fetch questions");
        }
      } catch (error) {
        toast.error("Error fetching questions.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [templateId]);

  const handleQuestionChange = (field, value) => {
    setQuestions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditTemplet = async () => {
    try {
      const res = await fetch(`/api/templets/update/${templateId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions), // No wrapper
      });
      if (res.ok) {
        toast.success("Template updated successfully!");
      } else {
        toast.error("Failed to update template.");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error editing template");
    }
  };

  const renderQuestion = (type, num) => {
    const stateKey = `${type}${num}State`;
    const questionKey = `${type}${num}Question`;

    if (questions[stateKey]) {
      return (
        <div key={`${type}${num}`} className="my-5 w-full text-center">
          <label className="text-3xl text-yellow-300 block">
            {type} Q){num}:
          </label>
          <input
            type="text"
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
                      className="my-2 w-4/5 flex justify-center"
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

  if (loading) {
    return <p>Loading...</p>;
  }
  // flex flex-col justify-center items-center w-full flex-wrap
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full p-10">
      <div className="w-1/2 max-w-2xl flex-col justify-center items-center flex-wrap">
        {/* Questions Info */}
        <div className="w-full max-w-full lg:max-w-4xl overflow-hidden text-center mt-[50px]">
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
          {/*questions?.imageUrl && (
            <img
              src={questions.imageUrl}
              alt="questions illustration"
              className="w-96 h-auto mx-auto my-5"
            />
          )*/}
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
        </div>

        {/* Render Questions Dynamically */}
        {["string", "text", "int", "checkbox"].map((type) =>
          [1, 2, 3, 4].map((num) => renderQuestion(type, num))
        )}

        <div className="flex justify-center items-center w-full">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4 mx-auto"
            onClick={handleEditTemplet}
          >
            Save Changes
          </button>
        </div>
      </div>
      {/* Right Section - Received Answers */}
      <div className="w-1/2">
        <h2 className="text-3xl text-indigo-700 mb-4 text-center mt-[50px]">
          Received Answers
        </h2>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div
              key={answer.id}
              className="border border-gray-500 p-4 my-2 rounded-lg"
            >
              <h3 className="text-lg text-white">User ID: {answer.userId}</h3>
              <button
                onClick={() =>
                  navigate(`/answer/view/${answer.id}/${templateId}`)
                }
                className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded w-full"
              >
                Check Answers
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No answers found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowCreatedQuestions;
