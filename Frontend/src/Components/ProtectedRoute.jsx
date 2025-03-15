import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;
