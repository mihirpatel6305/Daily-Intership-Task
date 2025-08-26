import api from "./axios";

export const loginUser = (credentials) => {
  return api.post("/login", credentials);
};


export const registerUser = (data) => {
  return api.post("/register", data);
};


export const logoutUser = () => {
  return api.post("/logout");
};

