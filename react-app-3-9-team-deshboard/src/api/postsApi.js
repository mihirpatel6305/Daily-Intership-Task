import axios from "axios";
import store from "../Store";
const baseUrl = import.meta.env.VITE_POSTS_BASE_URL;

const postsApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

postsApi.interceptors.request.use(
  (config) => {
    const token = store.getState()?.auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

postsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error.response.status === 401) {
      console.log("Unathorized access");
    }
    return Promise.reject(error);
  }
);

export default postsApi;
