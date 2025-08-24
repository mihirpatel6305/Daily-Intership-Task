import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 bg-gray-200 text-gray-700 px-6 py-4 flex justify-between items-center shadow-md z-50">
      <div
        onClick={() => navigate("/")}
        className="text-lg font-bold cursor-pointer"
      >
        MyStore
      </div>

      <div className="flex gap-6">
        <div
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 text-gray-700"
            fill="currentColor"
          >
            <path
              d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z"
              data-name="Shopping Cart"
            />
          </svg>
          <span className="text-gray-700 font-medium">Cart</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
