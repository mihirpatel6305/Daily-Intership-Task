import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isLogedin = JSON.parse(localStorage.getItem("token"));
  if (isLogedin) {
    return <Navigate to="/userlist" />;
  }
  return children;
}

export default PublicRoute;
