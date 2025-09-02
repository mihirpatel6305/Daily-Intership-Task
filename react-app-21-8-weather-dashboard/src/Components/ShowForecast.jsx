import { useSelector } from "react-redux";
import forecast from "../api/forecast";
import ForecastCard from "./ForecastCard";

function ShowForecast() {
  const { data: forecastData, isError, error, isLoading } = forecast();
  const theme = useSelector((state) => state.theme);

  // Apply dark class based on Redux theme
  document.documentElement.classList.toggle("dark", theme === "dark");

  if (isLoading) {
    return (
      <p
        className="text-center"
        style={{ color: "var(--color-fg)" }}
      >
        Loading forecast...
      </p>
    );
  }

  if (isError) {
    return (
      <p
        className="text-center"
        style={{ color: "var(--color-error-text)" }}
      >
        Error: {error?.message}
      </p>
    );
  }

  return (
    <div>
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--color-fg)" }}
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
            className="text-center w-full"
            style={{ color: "var(--color-fg)" }}
          >
            No forecast available
          </p>
        )}
      </div>
    </div>
  );
}

export default ShowForecast;
