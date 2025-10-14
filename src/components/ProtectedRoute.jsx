import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("⚠️ Please login first to access this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
