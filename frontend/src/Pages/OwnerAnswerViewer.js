import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const OwnerAnswerViewer = () => {
  const { answerId, templateId } = useParams();
  const [answer, setAnswer] = useState({});
  const [template, setTemplate] = useState({});
  const [loadingAnswer, setLoadingAnswer] = useState(true);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await fetch(
          `https://itransitionprojectbackend.onrender.com/api/answers/${answerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json", // Ensure proper content type
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
        console.error(error);
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
          `https://itransitionprojectbackend.onrender.com/api/templets/templet/${templateId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`, // Attach the token
              "Content-Type": "application/json", // Ensure proper content type
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
        console.error(error);
      } finally {
        setLoadingQuestion(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  if (loadingAnswer && loadingQuestion && !answer && !template) {
    return <p>Loading...</p>;
  }
  console.log(answer);
  console.log(template);

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
              <p className="p-2 border rounded bg-gray-100 text-black">
                {answer[answerKey] || "No response"}
              </p>
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
              <p className="p-2 border rounded bg-gray-100 whitespace-pre-line text-black">
                {answer[answerKey] || "No response"}
              </p>
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
              <p className="p-2 border rounded bg-gray-100 text-black">
                {answer[answerKey] !== null ? answer[answerKey] : "No response"}
              </p>
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

                  const isSelected = answer[answerKey] === optNum;

                  return (
                    <p
                      key={optNum}
                      className={`p-1 ${
                        isSelected ? "bg-green-400 font-bold" : ""
                      }`}
                    >
                      {template[optionKey]}
                    </p>
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default OwnerAnswerViewer;
