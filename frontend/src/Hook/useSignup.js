import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    email,
    name,
    password,
    confirmPassword,
    status = "non-admin",
  }) => {
    setLoading(true);
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            password,
            status,
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
