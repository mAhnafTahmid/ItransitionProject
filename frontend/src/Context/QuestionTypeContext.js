import { createContext, useContext, useState } from "react";

export const QuestionTypeContext = createContext();

export const useQuestionTypeContext = () => {
  return useContext(QuestionTypeContext);
};

export const QuestionTypeContextProvider = ({ children }) => {
  const [questionType, setQuestionType] = useState("details");
  return (
    <QuestionTypeContext.Provider value={{ questionType, setQuestionType }}>
      {children}
    </QuestionTypeContext.Provider>
  );
};
