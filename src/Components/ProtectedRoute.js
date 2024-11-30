import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export default function ProtectedRoute ({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

