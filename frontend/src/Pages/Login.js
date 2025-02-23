import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import useLogin from "../Hook/useLogin";

const Login = () => {
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handlePasswordShow = (e) => {
    e.preventDefault();
    setPasswordFieldType(
      passwordFieldType === "password" ? "text" : "password"
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      console.log("Error signing up", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center flex-wrap bg-black sm:w-[40%] lg:w-[25%] w-[60%] border rounded-2xl border-none shadow-lg shadow-indigo-700"
      >
        <h1 className="text-white text-2xl py-4">Login Page</h1>
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
        </div>
        <button className="bg-indigo-700 hover:bg-indigo-500 focus:bg-indigo-500 focus:ring-transparent px-3 py-2 border border-none rounded-lg text-white my-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
