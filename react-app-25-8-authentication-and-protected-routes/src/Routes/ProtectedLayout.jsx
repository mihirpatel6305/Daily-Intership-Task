import { Navigate, Outlet } from "react-router-dom";

function ProtectedLayout() {
  const isLogedin = JSON.parse(localStorage.getItem("token"));
  if (!isLogedin) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectedLayout;
