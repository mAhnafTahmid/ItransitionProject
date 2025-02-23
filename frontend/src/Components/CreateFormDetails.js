import React, { useState, useEffect } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const CreateFormDetails = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [accessList, setAccessList] = useState("");
  const [tags, setTags] = useState([]);
  const [tagQuery, setTagQuery] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [description, setDescription] = useState("");
  const { setQuestions } = useQuestionsContext();
  const { user } = useAuthContext();
  const token = localStorage.getItem("authToken");

  // Fetch tag suggestions
  useEffect(() => {
    const fetchTags = async () => {
      if (!tagQuery.trim()) {
        setSuggestedTags([]);
        return;
      }

      try {
        const response = await fetch(
          `/api/tags/autocomplete?query=${tagQuery}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`, // Attach the token
              "Content-Type": "application/json", // Ensure proper content type
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        setSuggestedTags(data.$values);
      } catch (error) {
        console.error("Error fetching tag suggestions:", error.message);
        toast.error("Failed to fetch tag suggestions", error.message);
      }
    };
    console.log(tagQuery);
    // Debounce input (fetch after 300ms delay)
    const debounceTimeout = setTimeout(fetchTags, 300);
    return () => clearTimeout(debounceTimeout);
  }, [tagQuery]);

  // Add tag from input
  const addTag = (tag) => {
    const newTags = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !tags.includes(t)); // Avoid empty & duplicate tags

    if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
    }

    setTagQuery(""); // Clear input
    setSuggestedTags([]); // Hide suggestions
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSetDetails = () => {
    if (!title.trim() || !topic.trim() || !description.trim()) {
      toast.error("Title, Topic, and Description are required fields.");
      return;
    }

    const data = {
      title: title,
      userId: user.id,
      topic: topic,
      isPublic: isPublic,
      accessList: accessList
        .split(",")
        .map((email) => email.trim()) // Store emails as strings
        .filter((email) => email.includes("@")), // Validate basic email format
      tags: tags,
      description: description,
    };

    try {
      setQuestions((prevQuestions) => ({
        ...prevQuestions,
        ...data,
      }));
      toast.success("Form details have been saved");
      setTitle("");
      setTopic("");
      setIsPublic(true);
      setAccessList("");
      setTags([]);
      setTagQuery("");
      setDescription("");
    } catch (error) {
      console.log("Error in saving details", error.message);
      toast.error("Error saving form details");
    }
  };

  return (
    <div className="min-w-full flex flex-col justify-start items-center pb-20">
      {/* Title */}
      <div className="w-full flex flex-col justify-start items-center my-2">
        <h1 className="text-xl w-full text-center mb-2">Enter Form Title</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter form title"
          className="py-2 border border-gray-400 rounded hover:border-blue-500 bg-white text-black mx-[88px] px-3 w-[95%]"
          required
        />
      </div>

      {/* Topic */}
      <div className="w-full flex flex-col justify-start items-center my-2">
        <h1 className="text-xl w-4/5 text-center mb-2">Enter Topic</h1>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
          className="py-2 border border-gray-400 rounded hover:border-blue-500 mx-[88px] px-3 w-[95%] bg-white text-black"
          required
        />
      </div>

      {/* Is Public Dropdown */}
      <div className="w-full flex flex-col justify-start items-center my-2">
        <h1 className="text-xl w-4/5 text-center mb-2">Visibility</h1>
        <select
          value={isPublic}
          onChange={(e) => setIsPublic(e.target.value === "true")}
          className="w-[70%] py-2 border border-gray-400 rounded hover:border-blue-500 px-2 bg-white text-black"
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
      </div>

      {/* Access List (Emails) */}
      <div className="w-full flex flex-col justify-start items-center my-2">
        <h1 className="text-xl w-4/5 text-center mb-2">Access List (Emails)</h1>
        <input
          type="text"
          value={accessList}
          onChange={(e) => setAccessList(e.target.value)}
          placeholder="Enter emails, separated by commas"
          className="mx-[88px] px-3 w-[95%] py-2 border border-gray-400 rounded hover:border-blue-500 bg-white text-black"
        />
      </div>

      {/* Description */}
      <div className="w-full flex flex-col justify-start items-center my-2">
        <h1 className="text-xl w-4/5 text-center mb-2">Enter Description</h1>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter form description"
          className="mx-[88px] px-3 w-[95%] py-2 border border-gray-400 rounded hover:border-blue-500 bg-white text-black"
          rows="4"
        />
      </div>

      {/* Tags */}
      <div className="w-full flex flex-col justify-start items-center my-2">
        <h1 className="text-xl w-4/5 text-center mb-2">Enter Tags</h1>
        <input
          type="text"
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          placeholder="Search or add tags"
          className="mx-[88px] px-3 w-[95%] py-2 border border-gray-400 rounded hover:border-blue-500 bg-white text-black"
        />
        <button
          type="button"
          onClick={() => {
            if (tagQuery.trim()) {
              addTag(tagQuery);
              setTagQuery("");
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
        >
          Add
        </button>
        {/* Tag Suggestions */}
        {suggestedTags.length > 0 && (
          <div className="w-[95%] border border-gray-400 rounded bg-white mt-1">
            {suggestedTags.map((tag) => (
              <div
                key={tag}
                className="p-2 hover:bg-blue-300 cursor-pointer"
                onClick={() => addTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
        {/* Selected Tags */}
        <div className="w-[95%] flex flex-wrap mt-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="m-1 px-3 py-1 bg-blue-500 text-white rounded-lg flex items-center"
            >
              {tag}
              <button
                className="ml-2 text-white font-bold"
                onClick={() => removeTag(tag)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSetDetails}
        className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600 text-black"
      >
        Save Form Details
      </button>
    </div>
  );
};

export default CreateFormDetails;
