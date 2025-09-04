import axios from "axios";
const baseUrl = import.meta.env.VITE_AUTH_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error.response.status === 401) {
      console.log("Unathorized access");
    }
    return Promise.reject(error);
  }
);

export default api;
