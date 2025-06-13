import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useContext(AuthContext);

  if (role === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (allowedRoles.includes(role)) {
    return children;
  } else {
    return <Navigate to="*" />;
  }
};

export default ProtectedRoute;
