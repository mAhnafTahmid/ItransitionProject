import { createContext, useContext, useState } from "react";

export const QuestionsContext = createContext();

export const useQuestionsContext = () => {
  return useContext(QuestionsContext);
};

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState({});
  const [questionsCount, setQuestionsCount] = useState({
    mcq: 0,
    text: 0,
    string: 0,
    integer: 0,
  });
  return (
    <QuestionsContext.Provider
      value={{ questions, setQuestions, questionsCount, setQuestionsCount }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
