import { Outlet } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

function ProtectedLayout() {
  return (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  );
}

export default ProtectedLayout;
