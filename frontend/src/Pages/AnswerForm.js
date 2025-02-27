import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import AnswerRenderer from "../Components/AnswerRenderer";
import { useParams } from "react-router-dom";

const AnswerForm = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const token = localStorage.getItem("authToken");

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
          console.log(data.message);
          toast.error(data.message || "Failed to fetch template");
        }
      } catch (error) {
        toast.error("Error fetching template.", error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  useEffect(() => {
    if (user && template) {
      if (
        template.isPublic ||
        template.accessList.$values.includes(user.email) ||
        user.status === "admin"
      ) {
        setIsAuthorized(true);
      } else {
        toast.error("You do not have access to this form.");
      }
    }
  }, [user, template]);

  const handleSubmit = async () => {
    try {
      setAnswers((prev) => ({
        ...prev,
        templetId: template.id,
        userId: user.id,
      }));
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/answers/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Submission failed.", error.message);
      console.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center w-full pt-[70px]">
      <h1>Mode: {isAuthorized ? "Editor" : "Viewer"}</h1>
      <h1 className="text-3xl font-bold text-center">
        Title: {template.title}
      </h1>
      <p className="text-gray-500 text-center">
        Description: {template.description}
      </p>

      <AnswerRenderer template={template} setAnswers={setAnswers} />

      {isAuthorized && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4 mx-auto"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default AnswerForm;
