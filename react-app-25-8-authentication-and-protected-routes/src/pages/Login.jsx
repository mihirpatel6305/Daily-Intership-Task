import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser } from "../api/authapi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      if (res?.data?.token) {
        localStorage.setItem("token", JSON.stringify(res?.data?.token));
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setErrorMsg("Something is Going Wrong.");
    },
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mutation.mutate(formData);
    mutation.mutate({
      email: "eve.holt@reqres.in",
      password: "pistol",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-96 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username or Email</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
