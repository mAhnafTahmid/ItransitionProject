import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const signup = async ({ email, name, password, confirmPassword }) => {
    setLoading(true);
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    try {
      const res = await fetch(
        "https://itransitionprojectbackend.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Signed up successfully");
      } else {
        toast.error(data.message || "Failed to signup");
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
