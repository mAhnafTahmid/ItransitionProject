import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseForm from "./Pages/BaseForm";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import LandingPage from "./Pages/LandingPage";
import ProfilePage from "./Pages/ProfilePage";
import { useAuthContext } from "./Context/AuthContext";
import AnswerForm from "./Pages/AnswerForm";
import OwnerAnswerViewer from "./Pages/OwnerAnswerViewer";
import ShowCreatedQuestions from "./Pages/ShowCreatedQuestions";

const Paths = () => {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/form" element={user ? <BaseForm /> : <Login />} />
          <Route path="/login" element={user ? <ProfilePage /> : <Login />} />
          <Route path="/signup" element={user ? <ProfilePage /> : <Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/answer/form/:templateId" element={<AnswerForm />} />
          <Route
            path="/edit/form/:templateId"
            element={<ShowCreatedQuestions />}
          />
          <Route
            path="/answer/view/:answerId/:templateId"
            element={<OwnerAnswerViewer />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
