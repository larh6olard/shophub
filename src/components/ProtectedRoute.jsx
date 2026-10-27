import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("currentUserEmail");

  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
