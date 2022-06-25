import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("user_token");
  const type = localStorage.getItem("type");
  if (!token && type !== "M") {
    return <Navigate to="/" />;
  }
  return children;
};
