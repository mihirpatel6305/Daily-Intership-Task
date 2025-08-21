import { useSelector } from "react-redux";
import forecast from "../api/forecast";
import ForecastCard from "./ForecastCard";

function ShowForecast() {
  const { data: forecastData, isError, error, isLoading } = forecast();
  const theme = useSelector((state) => state.theme);

  if (isLoading) {
    return (
      <p
        className={`text-center ${
          theme === "dark" ? "text-gray-50" : "text-gray-500 "
        }`}
      >
        Loading forecast...
      </p>
    );
  }

  if (isError) {
    return (
      <p
        className={`text-center ${
          theme === "dark" ? "text-red-400" : "text-red-500 "
        }`}
      >
        Error: {error?.message}
      </p>
    );
  }

  return (
    <div>
      <h2
        className={`text-xl font-semibold mb-4  ${
          theme === "dark" ? "text-gray-200" : "text-gray-800 "
        }`}
      >
        5-Day Forecast
      </h2>
      <div className="flex justify-between gap-3">
        {forecastData?.length > 0 ? (
          forecastData.map((data, index) => (
            <ForecastCard key={index} data={data} />
          ))
        ) : (
          <p
            className={`text-center w-full  ${
              theme === "dark" ? "text-gray-100" : "text-gray-500"
            }`}
          >
            No forecast available
          </p>
        )}
      </div>
    </div>
  );
}

export default ShowForecast;
