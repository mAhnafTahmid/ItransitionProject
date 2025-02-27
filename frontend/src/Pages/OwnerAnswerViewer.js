import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const OwnerAnswerViewer = () => {
  const { answerId, templateId } = useParams();
  const { user } = useAuthContext();
  const [answer, setAnswer] = useState({});
  const [template, setTemplate] = useState({});
  const [loadingAnswer, setLoadingAnswer] = useState(true);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_DEV_URL}/api/answers/${answerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setAnswer(data);
        } else {
          toast.error(data.message || "Failed to fetch answer");
        }
      } catch (error) {
        toast.error("Error fetching answer.");
      } finally {
        setLoadingAnswer(false);
      }
    };
    fetchAnswer();
  }, [answerId]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_DEV_URL}/api/templets/templet/${templateId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setTemplate(data);
        } else {
          toast.error(data.message || "Failed to fetch template");
        }
      } catch (error) {
        toast.error("Error fetching template.");
      } finally {
        setLoadingQuestion(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/answers/answer/${answerId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Answer updated successfully!");
      } else {
        toast.error(data.message || "Failed to update answer");
      }
    } catch (error) {
      toast.error("Error updating answer.");
    }
  };

  if (loadingAnswer || loadingQuestion) {
    return <p>Loading...</p>;
  }

  const isAdmin = user?.status === "admin";

  return (
    <div className="w-full max-w-4xl p-4 border-l border-r rounded-lg shadow mx-auto pt-[80px] min-h-screen">
      <h2 className="text-xl font-bold mb-4">Form Response</h2>

      {/* Render Single-Line Text Answers */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `string${num}State`;
        const questionKey = `string${num}Question`;
        const answerKey = `string${num}Answer`;

        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <p className="font-semibold">{template[questionKey]}</p>
              <input
                type="text"
                className="p-2 border rounded bg-gray-100 text-black w-full"
                value={answer[answerKey] || ""}
                onChange={(e) =>
                  isAdmin &&
                  setAnswer({ ...answer, [answerKey]: e.target.value })
                }
                disabled={!isAdmin}
              />
            </div>
          )
        );
      })}

      {/* Render Multi-Line Text Answers */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `text${num}State`;
        const questionKey = `text${num}Question`;
        const answerKey = `text${num}Answer`;

        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <p className="font-semibold">{template[questionKey]}</p>
              <textarea
                className="p-2 border rounded bg-gray-100 text-black w-full"
                value={answer[answerKey] || ""}
                onChange={(e) =>
                  isAdmin &&
                  setAnswer({ ...answer, [answerKey]: e.target.value })
                }
                disabled={!isAdmin}
              />
            </div>
          )
        );
      })}

      {/* Render Integer Answers */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `int${num}State`;
        const questionKey = `int${num}Question`;
        const answerKey = `int${num}Answer`;

        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <p className="font-semibold">{template[questionKey]}</p>
              <input
                type="number"
                className="p-2 border rounded bg-gray-100 text-black w-full"
                value={answer[answerKey] || ""}
                onChange={(e) =>
                  isAdmin &&
                  setAnswer({ ...answer, [answerKey]: e.target.value })
                }
                disabled={!isAdmin}
              />
            </div>
          )
        );
      })}

      {/* Render Checkbox (Radio) Answers */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `checkbox${num}State`;
        const questionKey = `checkbox${num}Question`;
        const answerKey = `checkbox${num}Answer`;

        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <p className="font-semibold">{template[questionKey]}</p>
              <div className="p-2 border rounded bg-gray-100 text-black">
                {[1, 2, 3, 4].map((optNum) => {
                  const optionKey = `checkbox${num}Option${optNum}`;
                  if (!template[optionKey]) return null;

                  return (
                    <label key={optNum} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`checkbox${num}`}
                        value={optNum}
                        checked={answer[answerKey] === optNum}
                        onChange={() =>
                          isAdmin &&
                          setAnswer({ ...answer, [answerKey]: optNum })
                        }
                        disabled={!isAdmin}
                      />
                      <span>{template[optionKey]}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )
        );
      })}

      {isAdmin && (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}
    </div>
  );
};

export default OwnerAnswerViewer;
