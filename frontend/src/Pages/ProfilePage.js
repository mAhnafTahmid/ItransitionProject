import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../Context/QuestionsContext";

const ProfilePage = () => {
  const [search, setSearch] = useState("");
  const [userComment, setUserComment] = useState("");
  const [searches, setSearches] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [expandedTemplate, setExpandedTemplate] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const { setQuestions } = useQuestionsContext();
  const token = localStorage.getItem("authToken");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`/api/users/templet/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json", // Ensure proper content type
          },
        });
        const data = await res.json();
        if (res.ok) {
          setTemplates(data?.$values || []);
        } else {
          // toast.error("Couldn't fetch templates", data.message);
          console.error("Couldn't fetch templates", data.message);
        }
      } catch (error) {
        toast.error("Error fetching templates", error.message);
        console.error(error.message);
        navigate("/");
      }
    };
    fetchTemplates();
  }, [user]);

  const handleToggleTemplate = (templateId) => {
    setExpandedTemplate((prev) => (prev === templateId ? null : templateId));
  };

  const handleToggleItem = (templateId) => {
    setExpandedItem((prev) => (prev === templateId ? null : templateId));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/templets/search?query=${search}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
          "Content-Type": "application/json", // Ensure proper content type
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSearches(data.$values);
      } else {
        toast.error("Couldn't search form", data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error searching form", error.message);
    }
  };

  const handleAnswerForm = (template) => {
    navigate(`/answer/form/${template.id}`);
  };

  const handleUseTemplate = async (template) => {
    const { id, ...rest } = template;
    setQuestions(rest);
    navigate("/form");
  };

  const handleLike = async (e, template) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/like/templet`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, templetId: template.id }),
      });
      const data = await res.json();
      if (res.ok) {
        const updatedTemplates = templates.map((temp) =>
          temp.id === template.id ? { ...temp, likes: data.likes } : temp
        );
        setSearches([]);
        setSearch("");
        setTemplates(updatedTemplates);
      } else {
        toast.error("Couldn't like the form", data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error liking the form", error.message);
    }
  };

  const handleComment = async (templateId) => {
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templetId: templateId, comment: userComment }),
      });

      const data = await res.json();
      if (res.ok) {
        const updatedTemplates = templates.map((temp) =>
          temp.id === templateId
            ? {
                ...temp,
                comments: {
                  $values: [
                    ...(temp.comments?.$values || []),
                    { comment: userComment },
                  ],
                },
              }
            : temp
        );
        setTemplates(updatedTemplates);
        setUserComment("");
        toast.success("Comment made successfully");
      } else {
        toast.error("Couldn't make comment", data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error making comment", error.message);
    }
  };

  return (
    <div className="min-h-screen pt-[100px] flex flex-col-reverse sm:flex-row">
      {/* Left side */}
      <div className="flex flex-col flex-grow w-full sm:w-[70%]">
        <div className="flex flex-col items-start ml-auto w-full sm:w-[80%]">
          <h1 className="text-[80px] text-purple-700">
            Welcome <span className="text-[80px] text-white">{user?.name}</span>
          </h1>
          <h2 className="text-3xl mt-16 text-indigo-600">
            Create your own form now!
          </h2>
          <button
            onClick={() => navigate("/form")}
            className="w-[120px] my-8 py-2 border border-white text-white"
          >
            Create Form
          </button>
        </div>

        {/* Template List */}
        <div className="mt-10 w-full sm:w-[80%] flex flex-col items-center justify-center">
          <h2 className="text-3xl text-indigo-700 mb-4">Your Templates</h2>
          {templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template.id}
                className="border border-white p-4 my-2 rounded-lg min-w-full ml-[100px]"
              >
                <h3
                  className="text-xl text-white cursor-pointer"
                  onClick={() => handleToggleTemplate(template.id)}
                >
                  {template.title}
                </h3>
                {expandedTemplate === template.id && (
                  <div className="mt-3">
                    <p className="text-gray-300">{template.description}</p>
                    <p className="text-indigo-400">Likes: {template.likes}</p>
                    <button
                      onClick={() => navigate(`/edit/form/${template.id}`)}
                      className="mt-2 px-4 py-2 border border-indigo-700 text-white hover:bg-indigo-700"
                    >
                      View Template
                    </button>
                    <p className="text-green-400 mt-2">Comments:</p>
                    {template.comments?.$values?.length > 0 &&
                      template.comments.$values?.map((comment, index) => {
                        return (
                          <div className="mt-2" key={index}>
                            <p className="text-gray-300">
                              {index + 1}. {comment.comment}
                            </p>
                          </div>
                        );
                      })}
                    <input
                      type="text"
                      placeholder="Make a comment"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-[50%] mr-3 p-2 border rounded bg-white text-black"
                    />
                    <button
                      onClick={() => handleComment(template.id)}
                      className="mt-2 px-4 py-2 border rounded-md border-indigo-700 text-white hover:bg-indigo-700"
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No templates found.</p>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col flex-grow w-full sm:w-[30%]">
        <form className="px-3 py-3 flex flex-col items-center border border-white sm:mr-8 rounded-3xl">
          <h1 className="text-3xl text-indigo-700 mb-5">Search a form</h1>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Topic, Title, Question ..."
            type="text"
            className="w-[80%] px-2 py-2 rounded-xl bg-white text-black border-indigo-700 border-[2px] shadow-md shadow-indigo-700 my-3"
          />
          <button
            className="w-[120px] my-4 py-2 border border-white text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        {search && (
          <div className="px-3 py-3 my-9 flex flex-col items-center border border-white sm:mr-8 rounded-3xl">
            <h1 className="text-3xl text-indigo-700 mb-5">
              Searches to all of your forms
            </h1>
            {searches.length > 0 ? (
              searches.map((item) => (
                <div
                  key={item.id}
                  className="border border-white p-4 my-2 rounded-lg w-[90%]"
                >
                  <h3
                    className="text-xl text-white cursor-pointer"
                    onClick={() => handleToggleItem(item.id)}
                  >
                    {item.title}
                  </h3>
                  {expandedItem === item.id && (
                    <div className="mt-3">
                      <p className="text-gray-300">{item.description}</p>
                      <p className="text-indigo-400 mb-3">
                        Likes: {item.likes}
                      </p>
                      <button
                        className="px-4 py-2 mr-4 bg-violet-600 text-white rounded hover:bg-violet-700"
                        onClick={() => handleUseTemplate(item)}
                      >
                        Use Template
                      </button>
                      <button
                        onClick={() => handleAnswerForm(item)}
                        className="px-4 py-2 mr-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      >
                        Answer Form
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-3"
                        onClick={(e) => handleLike(e, item)}
                      >
                        Like
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h1>Search does not match any form</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
