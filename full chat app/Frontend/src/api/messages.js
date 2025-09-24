import api from "./axios";

export const getUnreadCount = async (userId) => {
  try {
    const res = await api.get(`message/unreadCount/${userId}`);
    return res.data?.unreadCounts;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
