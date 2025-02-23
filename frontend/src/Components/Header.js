import React from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useQuestionsContext } from "../Context/QuestionsContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const { setQuestions, setQuestionsCount } = useQuestionsContext();
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setUser(null);
      setQuestions({});
      setQuestionsCount({
        mcq: 0,
        text: 0,
        string: 0,
        integer: 0,
      });
      toast.success("Logout successful");
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.log("Unable to logout");
      toast.error("Unable to logout");
    }
  };

  return (
    <div className="navbar bg-base-100 fixed z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Form Service App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <div className="flex flex-row">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </div>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
