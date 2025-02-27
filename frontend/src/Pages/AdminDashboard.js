import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../Context/QuestionsContext";
import useLogout from "../Hook/useLogout";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [numUsers, setNumUsers] = useState(0);
  const [numTemplates, setNumTemplates] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [searches, setSearches] = useState(null);
  const [expandedAdmin, setExpandedAdmin] = useState(null);
  const { setQuestions } = useQuestionsContext();
  const token = localStorage.getItem("authToken");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_DEV_URL}/api/admin/dashboard/stats`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setAdmins(data?.admins.$values || []);
          setNumUsers(data?.totalUsers || []);
          setNumTemplates(data?.totalTemplets || []);
        } else {
          toast.error("Couldn't fetch dashboard data", data.message);
          console.error("Couldn't fetch dashboard data", data.message);
        }
      } catch (error) {
        toast.error("Error fetching dashboard data", error.message);
        console.error(error.message);
        navigate("/");
      }
    };
    fetchStats();
  }, [user]);

  const handleToggleAdmin = (adminId) => {
    setExpandedAdmin((prev) => (prev === adminId ? null : adminId));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/admin/user/info/${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSearches(data);
      } else {
        toast.error("Couldn't find user", data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error finding user", error.message);
    }
  };

  const handleAnswerForm = (template) => {
    navigate(`/answer/form/${template.id}`);
  };

  const handleUseTemplate = async (template) => {
    const { id, ...rest } = template;
    setQuestions(rest);
    navigate("/form");
  };

  const handleLike = async (e, template) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/users/like/templet`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, templetId: template.id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error("Couldn't like the form", data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error liking the form", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/admin/delete/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log("Failed to delete user", data.message);
        toast.error("Failed to delete user", data.message);
        return;
      }
      if (userId === user.id) {
        logout();
      }
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== userId)
      );
      setSearch("");
      console.log("User deleted successfully");
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Error deleting user", error.message);
    }
  };

  const handleMakeNonAdmin = async (adminId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/admin/change/${adminId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log("Failed to change admin role", data.message);
        toast.error("Failed to change admin role", data.message);
        return;
      }
      if (adminId === user.id) {
        logout();
      }
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== adminId)
      );
      console.log("Admin status changed successfully");
      toast.success("Admin status changed successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Error changing status admin", error.message);
    }
  };

  const handleDeleteTemplate = async (e, templateId) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/templets/delete/${templateId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        await handleSearch(e);
        console.log("Template deleted successfully");
        toast.success("Template deleted successfully");
      } else {
        console.log("Failed to delete template", data.message);
        toast.error("Failed to delete template", data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error deleting template", error.message);
    }
  };

  return (
    <div className="min-h-screen pt-[100px] flex flex-col-reverse sm:flex-row">
      {/* Left side */}
      <div className="flex flex-col flex-grow w-full sm:w-[70%]">
        <div className="flex flex-col items-start ml-auto w-full sm:w-[80%]">
          <h1 className="text-[60px] text-purple-700">
            Admin Dashboard of{" "}
            <span className="text-[60px] text-white">{user?.name}</span>
          </h1>
          <h2 className="text-3xl mt-16 text-indigo-600">
            Register another Admin
          </h2>
          <button
            onClick={() => navigate("/register/admin")}
            className="w-[120px] my-8 py-2 border border-white text-white"
          >
            Create Admin
          </button>
        </div>

        {/* Admin List */}
        <div className="mt-10 mb-16 w-full sm:w-[80%] flex flex-col items-center justify-center">
          <h2 className="text-3xl text-indigo-700 mb-4">
            Application Statistics
          </h2>
          <label>Number of Users: {numUsers}</label>
          <label>Number of Templates: {numTemplates}</label>
          <h1 className="text-white text-2xl mt-5">Admins</h1>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <div
                key={admin.id}
                className="border border-white p-4 my-2 rounded-lg w-[90%]"
              >
                <h3
                  className="text-xl text-white cursor-pointer"
                  onClick={() => handleToggleAdmin(admin.id)}
                >
                  {admin.name}
                </h3>
                {expandedAdmin === admin.id && (
                  <div className="mt-3">
                    <p className="text-gray-300">{admin.email}</p>
                    <button
                      className="px-4 py-2 mr-4 mt-3 bg-violet-600 text-white rounded hover:bg-violet-700"
                      onClick={() => handleDeleteUser(admin.id)}
                    >
                      Delete Admin
                    </button>
                    <button
                      onClick={() => handleMakeNonAdmin(admin.id)}
                      className="px-4 py-2 mr-4 mt-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Make Non-Admin
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h1>There are no admins</h1>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col flex-grow w-full sm:w-[30%]">
        <form className="px-3 py-3 flex flex-col items-center border border-white sm:mr-8 rounded-3xl">
          <h1 className="text-3xl text-indigo-700 mb-5">Search a user</h1>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Id, username & email only"
            type="text"
            className="w-[80%] px-2 py-2 rounded-xl bg-white text-black border-indigo-700 border-[2px] shadow-md shadow-indigo-700 my-3"
          />
          <button
            className="w-[120px] my-4 py-2 border border-white text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        {search && (
          <div className="px-3 py-3 my-9 flex flex-col items-center border border-white sm:mr-8 rounded-3xl">
            <h1 className="text-3xl text-indigo-700 mb-5">
              Your searched user
            </h1>
            {searches ? (
              <div
                key={searches.id}
                className="border border-white p-4 my-2 rounded-lg w-[90%]"
              >
                <h3 className="text-xl text-white cursor-pointer">
                  User ID: {searches.id}
                </h3>
                <h3 className="text-xl text-white cursor-pointer">
                  Name: {searches.name}
                </h3>
                <h3 className="text-xl text-white cursor-pointer">
                  Email: {searches.email}
                </h3>
                <button
                  className="px-4 py-2 bg-red-950 text-white rounded hover:bg-red-700 mt-3"
                  onClick={() => handleDeleteUser(searches.id)}
                >
                  Delete User
                </button>
                {searches.templets?.$values?.length > 0 &&
                  searches.templets?.$values?.map((item) => (
                    <div className="mt-3">
                      <p className="text-gray-300">Template ID: {item.id}</p>
                      <p className="text-indigo-400 mb-3">
                        Title: {item.title}
                      </p>
                      <button
                        onClick={() => navigate(`/edit/form/${item.id}`)}
                        className="mt-2 px-4 py-2 border border-indigo-700 text-white hover:bg-indigo-700 mr-3 rounded-md"
                      >
                        View Template
                      </button>
                      <button
                        className="px-4 py-2 mr-4 bg-violet-600 text-white rounded hover:bg-violet-700"
                        onClick={() => handleUseTemplate(item)}
                      >
                        Use Template
                      </button>
                      <button
                        onClick={() => handleAnswerForm(item)}
                        className="px-4 py-2 mr-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      >
                        Answer Form
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-3 mr-4"
                        onClick={(e) => handleLike(e, item)}
                      >
                        Like
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-3"
                        onClick={(e) => handleDeleteTemplate(e, item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <h1>Search does not match any user</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
