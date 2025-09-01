import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import Home from "../pages/Home";
import Login from "../pages/login";
import Logout from "../pages/Logout";
import UserList from "../pages/userList";
import PublicRoute from "./PublicLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route element={<ProtectedLayout />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/userlist" element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
