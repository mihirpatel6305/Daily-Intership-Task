import postsApi from "./postsApi";

export async function getAllUsers() {
  const res = await postsApi.get("/users");
  return res.data;
}

export async function getPostsByUserId(id) {
  const res = await postsApi.get(`/posts?userId=${id}`);
  return res.data;
}
