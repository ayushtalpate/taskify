import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth.js";

const Navbar = () => {
   

  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();              // remove token
    navigate("/login");    // redirect
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold">Taskify</h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {!loggedIn ? (
          <>
            <NavLink
              to="/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="hover:text-blue-400 transition"
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard"
              className="hover:text-green-400 transition"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className="hover:text-green-400 transition"
            >
              Tasks
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
