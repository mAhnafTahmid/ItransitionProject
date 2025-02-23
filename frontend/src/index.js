import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import Paths from "./Paths";
import reportWebVitals from "./reportWebVitals";
import { QuestionTypeContextProvider } from "./Context/QuestionTypeContext";
import { QuestionsContextProvider } from "./Context/QuestionsContext";
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuestionTypeContextProvider>
        <QuestionsContextProvider>
          <Paths />
        </QuestionsContextProvider>
      </QuestionTypeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
