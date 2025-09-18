import api from "./axios";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/allUser");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get("/user/me");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetUnreadMessage = async (senderId) => {
  try {
    const res = await api.get(`/user/resetUnreadMessage/${senderId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
