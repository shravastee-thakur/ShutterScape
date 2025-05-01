import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  // Utility function to check if path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#27667B] text-white p-4 lg:p-6 flex justify-between items-center">
      <h1
        className="text-2xl lg:text-4xl font-semibold md:px-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ShutterScape
      </h1>
      <div className="flex gap-4 md:px-10">
        <button
          onClick={handleUpload}
          className={`px-2 md:py-1 rounded-lg md:font-bold font-semibold ${
            isActive("/upload") ? "bg-[#1da1f2]" : "bg-[#45b8df]"
          }`}
        >
          Upload
        </button>
        <button
          onClick={handleLogin}
          className={`px-2 md:py-1 rounded-lg md:font-bold font-semibold ${
            isActive("/login") ? "bg-[#1da1f2]" : "bg-[#45b8df]"
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
