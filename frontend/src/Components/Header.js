import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import useLogout from "../Hook/useLogout";

const Header = () => {
  const { user } = useAuthContext();
  const logout = useLogout();
  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [user]);

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
                {user.status === "admin" && <Link to="/admin">Dashboard</Link>}
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
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
