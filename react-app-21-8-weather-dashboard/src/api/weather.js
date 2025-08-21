import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function weather() {
  const city = useSelector((state) => state.city);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    },
  });
  return { data, isLoading, isError, error };
}

export default weather;
