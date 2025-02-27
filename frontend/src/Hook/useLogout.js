import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useQuestionsContext } from "../Context/QuestionsContext";

const useLogout = () => {
  const { setUser } = useAuthContext();
  const { setQuestions, setQuestionsCount } = useQuestionsContext();
  const navigate = useNavigate();

  const logout = () => {
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

  return logout;
};

export default useLogout;
