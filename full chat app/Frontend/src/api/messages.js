import api from "./axios";

export const getPrevMessage = async (receiverid) => {
  try {
    const res = await api.get(`message/${receiverid}`);
    return res.data?.messages;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
