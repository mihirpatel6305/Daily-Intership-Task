import api from "./axios";

async function getData({ pageParam = 1 }) {
  const res = await api.get("", {
    params: { per_page: 2, page: pageParam },
  });
  return res.data;
}

export default getData;
