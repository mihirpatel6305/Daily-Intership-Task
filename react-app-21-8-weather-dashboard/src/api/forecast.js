import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import formatForecastData from "../utility/formatForecastData";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function forecast() {
  const city = useSelector((state) => state.city);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["forecast",city],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const dayForecast = res?.data?.list?.filter((item) =>
        item?.dt_txt?.includes("12:00:00")
      );
      return formatForecastData(dayForecast);
    },
  });
  return { data, isLoading, isError, error };
}

export default forecast;
