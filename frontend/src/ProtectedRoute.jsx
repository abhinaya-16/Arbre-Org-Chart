import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (inProgress !== "none") {
    return <div>Loading...</div>;
  }

  // Not logged in → block access
  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;