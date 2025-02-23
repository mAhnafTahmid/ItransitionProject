import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuthContext();

  const login = async ({ email, password }) => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("authToken", JSON.stringify(data.token));
        setUser(data.user);
        toast.success("Login successful");
      } else {
        toast.error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
