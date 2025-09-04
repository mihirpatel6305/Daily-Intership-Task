import { useDispatch } from "react-redux";
import login from "../api/authService";
import { setToken } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../api/postsService";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });

      if (data?.token) {
        dispatch(setToken(data.token));
        await queryClient.prefetchQuery({
          queryKey: ["users"],
          queryFn: getAllUsers,
        });
        navigate("/");
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
      </div>
    </div>
  );
}

export default Login;
