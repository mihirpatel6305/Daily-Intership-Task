import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/login";
import DashBoard from "../Pages/DashBoard";
import UserPosts from "../Pages/UserPosts";
import ProtectedLayout from "../Components/ProtectedLayout";
import { useSelector } from "react-redux";

function AllRoutes() {
  const isLoggedIn = useSelector((state) => !!state?.auth?.token);
  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/user/:userId/posts" element={<UserPosts />} />
      </Route>
    </Routes>
  );
}
export default AllRoutes;
