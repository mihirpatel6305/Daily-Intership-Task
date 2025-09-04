import authApi from "./authApi";

export async function login({ email, password }) {
  const res = await authApi.post("/login", { email, password });
  return res.data;
}

export default login;
