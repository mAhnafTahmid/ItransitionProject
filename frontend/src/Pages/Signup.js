import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import useSignup from "../Hook/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, signup } = useSignup();
  const navigate = useNavigate();

  const handlePasswordShow = (e) => {
    e.preventDefault();
    setPasswordFieldType(
      passwordFieldType === "password" ? "text" : "password"
    );
  };

  const handleConfirmPasswordShow = (e) => {
    e.preventDefault();
    setConfirmPasswordFieldType(
      confirmPasswordFieldType === "password" ? "text" : "password"
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, name, password, confirmPassword });
      navigate("/login");
    } catch (error) {
      toast.error("Error signing up", error.message);
      console.log("Error signing up", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center justify-center flex-wrap bg-black sm:w-1/2 lg:w-[30%] w-[70%] border rounded-2xl border-none shadow-lg shadow-indigo-700"
      >
        <h1 className="text-white text-2xl py-4">Sign Up Page</h1>
        <div className="flex flex-col justify-start items-start px-6 py-3 w-full">
          <label className="py-2 text-xl text-white">Email</label>
          <div className="flex w-full">
            <input
              value={email}
              type="text"
              placeholder="e.g., xyz@gmail.com"
              className="py-2 px-3 border-none rounded-md flex-grow"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <label className="py-2 text-xl text-white">Full Name</label>
          <div className="flex w-full">
            <input
              value={name}
              type="text"
              placeholder="e.g., John Doe"
              className="py-2 px-3 border-none rounded-md flex-grow"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <label className="py-2 text-xl text-white">Password</label>
          <div className="flex w-full relative">
            <input
              value={password}
              type={passwordFieldType}
              className="py-2 px-3 border-none rounded-md flex-grow"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={handlePasswordShow}
            >
              {passwordFieldType === "password" ? (
                <IoEyeOutline />
              ) : (
                <IoEyeOffOutline />
              )}
            </button>
          </div>

          <label className="py-2 text-xl text-white">Confirm Password</label>
          <div className="flex w-full relative">
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
              type={confirmPasswordFieldType}
              className="py-2 px-3 border-none rounded-md flex-grow"
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={handleConfirmPasswordShow}
            >
              {confirmPasswordFieldType === "password" ? (
                <IoEyeOutline />
              ) : (
                <IoEyeOffOutline />
              )}
            </button>
          </div>
        </div>
        <button className="bg-indigo-700 hover:bg-indigo-500 focus:bg-indigo-500 focus:ring-transparent px-3 py-2 border border-none rounded-lg text-white my-4">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
