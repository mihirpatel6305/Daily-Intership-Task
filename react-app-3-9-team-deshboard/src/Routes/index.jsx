import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/login";
import DashBoard from "../Pages/DashBoard";
import UserPosts from "../Pages/UserPosts";
import Layout from "../Layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../Pages/Profile";
import Signup from "../Pages/Signup";
import PublicRoutes from "./PublicRoutes";

function AllRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/user/:userId/posts" element={<UserPosts />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default AllRoutes;
