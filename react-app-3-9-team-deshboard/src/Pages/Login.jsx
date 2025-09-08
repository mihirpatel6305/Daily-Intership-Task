import { useDispatch, useSelector } from "react-redux";
import login from "../api/authService";
import { setToken, setUser } from "../features/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const prevRoute = location?.state?.from?.pathname || "/";

  const dummyUser = {
    id: 1,
    name: "Rajpal Sharma",
    username: "rajpal123",
    email: "rajpal123@gmail.com",
    phone: "+91 98765 43210",
    website: "www.rajpal.com",
    address: {
      street: "MG Road",
      suite: "Apt. 101",
      city: "Mumbai",
      zipcode: "400001",
    },
    company: {
      name: "Rajpal Tech Solutions",
      catchPhrase: "Innovate and Deliver",
      bs: "technology solutions",
    },
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });

      if (data?.token) {
        await dispatch(setToken(data.token));
        //fetch User info here and set in redux store
        dispatch(setUser(dummyUser));
        navigate(prevRoute, { replace: true });
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
