import React from "react";
import { Navigate } from "react-router-dom";
const ProtectRoute = ({ children }) => {
  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
export default ProtectRoute;
