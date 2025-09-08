import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const isLoggedIn = useSelector((state) => !!state?.auth?.token);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default PublicRoutes;
