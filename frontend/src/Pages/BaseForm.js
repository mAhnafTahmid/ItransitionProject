import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import RenderQuestion from "../Components/RenderQuestion";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import { useQuestionsContext } from "../Context/QuestionsContext";
import toast from "react-hot-toast";
import ViewCreatedQuestions from "../Components/ViewCreatedQuestions";

const BaseForm = () => {
  const { questions, setQuestions } = useQuestionsContext();
  const { setQuestionType } = useQuestionTypeContext();
  const token = localStorage.getItem("authToken");

  const handleCreateForm = async (e) => {
    e.preventDefault();
    try {
      if (questions.length === 0) {
        toast.error("No question has been made");
        return;
      }
      if (
        !questions.title &&
        !questions.topic &&
        !questions.description &&
        !questions.tags &&
        !questions.userId
      ) {
        toast.error("Details about the form are missing");
        return;
      }
      if (questions.isPublic === "false" && !questions.accessList) {
        toast.error("The template is private, but no access has been given");
        return;
      }

      const res = await fetch(
        "https://itransitionprojectbackend.onrender.com/api/templets/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questions),
        }
      );

      if (res.ok) {
        toast.success("Form has been created");
        setQuestions({});
      } else {
        const errorData = await res.json();
        toast.error(
          `Form creation unsuccessful: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error in form creation:", error);
      toast.error(`Error in form creation: ${error.message}`);
    }
  };

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-start mt-[50px]">
          {/* Page content here */}
          <div className="w-full flex flex-row px-4 py-5">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden bg-transparent border-none px-6"
            >
              <RxHamburgerMenu className="text-white text-3xl" />
            </label>
          </div>

          <ViewCreatedQuestions />
        </div>
        <div className="drawer-side mt-[64px]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-xl">
            {/* Sidebar content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden w-[80px] bg-inherit border-transparent text-3xl text-white mb-2"
            >
              <RxCross2 />
            </label>

            <div className="divider divider-primary lg:hidden"></div>

            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("details");
                }}
              >
                Add Form Details
              </button>
            </li>
            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("text");
                }}
              >
                Add Text Question
              </button>
            </li>
            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("mcq");
                }}
              >
                Add MCQ Question
              </button>
            </li>
            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("string");
                }}
              >
                Add Single Line Question
              </button>
            </li>
            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("integer");
                }}
              >
                Add Integer Question
              </button>
            </li>
            <div className="divider divider-primary"></div>
            <RenderQuestion />
            {Object.keys(questions).length > 0 && (
              <button
                type="button"
                onClick={handleCreateForm}
                className="border px-4 py-2 my-4 rounded-lg bg-purple-900 hover:bg-indigo-900 text-orange-600 border-indigo-500 hover:text-orange-400"
              >
                Create Form
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BaseForm;
