import api from "./axios";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/allUser");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
