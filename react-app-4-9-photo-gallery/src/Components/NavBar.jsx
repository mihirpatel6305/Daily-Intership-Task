import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-12 bg-gray-100 px-8 py-4 shadow-md rounded-b-md">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer text-lg text-gray-700 hover:text-blue-600 font-semibold transition"
      >
        File Upload
      </div>
      <div
        onClick={() => navigate("/gallery")}
        className="cursor-pointer text-lg text-gray-700 hover:text-blue-600 font-semibold transition"
      >
        Gallery
      </div>
    </nav>
  );
}

export default NavBar;
