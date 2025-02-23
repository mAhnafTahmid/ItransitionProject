import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../Context/QuestionsContext";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTemplate, setExpandedTemplate] = useState(null);
  const { setQuestions } = useQuestionsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          "https://itransitionprojectbackend.onrender.com/api/templets/top10"
        );
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data = await response.json();
        setTemplates(data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const toggleExpand = (index) => {
    setExpandedTemplate(expandedTemplate === index ? null : index);
  };

  const fetchTemplate = async (templateId) => {
    try {
      const res = await fetch(
        `https://itransitionprojectbackend.onrender.com/api/templets/templet/${templateId}`
      );
      const data = await res.json();

      if (res.ok) {
        const { id, userId: _, ...rest } = data;
        setQuestions({ ...rest, userId: user.id });
      } else {
        toast.error(data.message || "Failed to fetch template");
      }
    } catch (error) {
      toast.error("Error fetching template.", error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = async (template) => {
    await fetchTemplate(template.id);
    navigate("/form");
  };

  const handleAnswerForm = (template) => {
    navigate(`/answer/form/${template.id}`);
  };

  return (
    <div className="grid gap sm:grid-cols-2 sm:gap-6 grid-rows-2 min-h-screen">
      {/* Left Side */}
      <div className="flex flex-col sm:row-span-2 justify-center items-center h-screen sm:h-auto">
        <div className="flex flex-col flex-wrap w-[70%]">
          <h1 className="text-4xl text-violet-600 mb-6">
            Create your own questionnaire
          </h1>
          <h2 className="text-xl text-white">
            Whether you're a teacher or a student, use our website to easily
            create interactive forms for your assignments. Simplify your
            workflow and gather responses effortlessly with our intuitive
            platform.
          </h2>
          <h1 className="text-3xl text-indigo-500 mt-10">Get Started Today!</h1>
          <h2 className="text-xl my-6 text-white">
            Sign up now to start creating <br />
            your own interactive forms.
          </h2>
          <button
            className="border border-white text-white mt-5 py-3 w-[150px] hover:bg-violet-600 hover:text-black hover:border-violet-600"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center flex-grow row-span-2 h-screen sm:h-auto">
        <img
          src="/backgroung.jpg"
          alt="website visualization"
          className="h-[70%] mt-[130px] w-[80%]"
        />
      </div>

      {/* Templates List */}
      <div className="col-span-2 mt-10 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl text-white mb-4 text-center">
          Top 10 Most Liked Templates
        </h2>

        {loading && (
          <p className="text-white text-center">Loading templates...</p>
        )}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {!loading && !error && templates.length === 0 && (
          <p className="text-white text-center">No templates available.</p>
        )}

        <div className="space-y-4">
          {templates.map((template, index) => (
            <div
              key={index}
              className="border border-gray-700 p-4 rounded-lg bg-gray-900 text-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{template.title}</h3>
                <button
                  className="text-sm text-indigo-400 hover:underline"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedTemplate === index ? "Collapse" : "Expand"}
                </button>
              </div>

              {expandedTemplate === index && (
                <div className="mt-2">
                  <p className="text-gray-300">
                    <strong>Description:</strong>{" "}
                    {template.description || "No description available"}
                  </p>
                  <p className="text-gray-300">
                    <strong>Likes:</strong> {template.likes}
                  </p>
                  <p className="text-gray-300">
                    <strong>Topic:</strong> {template.topic}
                  </p>
                  <p className="text-gray-300">
                    <strong>Tags:</strong>{" "}
                    {template.tags?.["$values"]
                      ?.map((tag) => tag.name)
                      .join(", ") || "No tags"}
                  </p>

                  {/* Buttons for "Use Template" and "Answer Form" */}
                  <div className="mt-4 flex gap-4">
                    <button
                      className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </button>
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      onClick={() => handleAnswerForm(template)}
                    >
                      Answer Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
