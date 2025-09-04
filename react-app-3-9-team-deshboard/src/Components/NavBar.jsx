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
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <div
        className="text-xl font-bold text-gray-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Dashboard
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
