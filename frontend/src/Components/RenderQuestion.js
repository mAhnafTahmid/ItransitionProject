import React from "react";
import CreateTextQuestion from "./CreateTextQuestion";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import CreateMcqQuestion from "./CreateMcqQuestion";
import CreateFormDetails from "./CreateFormDetails";
import CreateStringQuestion from "./CreateStringQuestion";
import CreateIntQuestion from "./CreateIntQuestion";

const RenderQuestion = () => {
  const { questionType } = useQuestionTypeContext();
  switch (questionType) {
    case "text":
      return (
        <div>
          <CreateTextQuestion />
        </div>
      );
    case "string":
      return (
        <div>
          <CreateStringQuestion />
        </div>
      );
    case "mcq":
      return (
        <div>
          <CreateMcqQuestion />
        </div>
      );
    case "integer":
      return (
        <div>
          <CreateIntQuestion />
        </div>
      );
    case "details":
      return (
        <div>
          <CreateFormDetails />
        </div>
      );
    default:
      return null;
  }
};

export default RenderQuestion;
