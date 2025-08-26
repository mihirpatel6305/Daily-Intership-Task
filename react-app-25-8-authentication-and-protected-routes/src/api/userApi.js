import api from "./axios";

export const fetchUser = (id, token) => {
  return api.get(`/users`);
};
