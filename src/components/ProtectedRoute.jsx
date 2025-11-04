// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // Condition: token nahi hai → redirect login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Agar token hai → component render karo
  return children;
}
