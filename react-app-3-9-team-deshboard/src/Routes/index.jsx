import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/login";
import DashBoard from "../Pages/DashBoard";
import UserPosts from "../Pages/UserPosts";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../Pages/Profile";

function AllRoutes() {
  const isLoggedIn = useSelector((state) => !!state?.auth?.token);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
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
