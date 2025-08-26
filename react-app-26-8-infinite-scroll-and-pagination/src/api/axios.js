import axios from "axios";
const BaseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BaseUrl,
});

export default api;
