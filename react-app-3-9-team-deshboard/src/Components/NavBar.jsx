import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../features/authSlice";
import { useQueryClient } from "@tanstack/react-query";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(clearToken());
    queryClient.clear();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col justify-between h-full min-h-screen bg-gray-50 text-gray-800 w-56 p-4 shadow-md">
      <div className="flex flex-col mt-4 gap-4">
        <div
          onClick={() => navigate("/")}
          className="text-lg font-medium p-3 rounded-md hover:bg-gray-100 hover:shadow-sm cursor-pointer transition-all"
        >
          Dashboard
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="text-lg font-medium p-3 rounded-md hover:bg-gray-100 hover:shadow-sm cursor-pointer transition-all"
        >
          Profile
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 hover:shadow-sm transition-all"
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
