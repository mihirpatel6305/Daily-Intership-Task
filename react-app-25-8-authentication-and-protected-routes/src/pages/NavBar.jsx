import { useNavigate } from "react-router-dom";

function NavBar() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/", show: true },
    { label: "User List", path: "/userlist", show: !!token },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          {navItems
            .filter((item) => item.show)
            .map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                {item.label}
              </button>
            ))}
        </div>


        <div>
          {token ? (
            <button
              onClick={() => navigate("/logout")}
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
