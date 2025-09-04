import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const isAuthenticated = useSelector((state) => !!state?.auth?.token);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoutes;
