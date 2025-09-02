import { useSelector } from "react-redux";
import weather from "../api/weather";
import { WEATHER_ICON_URL } from "../config";
import formatWeatherData from "../utility/formatWeatherData";

function ShowWeather() {
  const { data, isError, isLoading, error } = weather();
  const weatherData = formatWeatherData(data);
  const theme = useSelector((state) => state.theme);

  document.documentElement.classList.toggle("dark", theme === "dark");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="rounded-2xl shadow-lg w-110 p-6 flex flex-col items-center"
          style={{
            backgroundColor: "var(--color-loading-bg)",
            color: "var(--color-loading-text)",
          }}
        >
          <p className="animate-pulse text-2xl">Loading weather...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="rounded-2xl shadow-lg w-110 p-6 flex flex-col items-center"
          style={{
            backgroundColor: "var(--color-error-bg)",
            color: "var(--color-error-text)",
          }}
        >
          <p className="font-semibold text-2xl">Failed to load weather</p>
          <p className="text-sm mt-1">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="rounded-2xl shadow-lg w-110 p-6 flex flex-col items-center text-xl"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-fg)",
          }}
        >
          <p className="font-semibold">No weather data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-2xl shadow-lg w-110 p-6 flex flex-row justify-around"
        style={{
          backgroundColor: "var(--color-brand)",
          color: "var(--color-fg)",
        }}
      >
        <div className="p-1 flex flex-col items-center w-40">
          <div className="w-24 h-24 flex items-center justify-center">
            {weatherData.icon && (
              <img
                src={`${WEATHER_ICON_URL}${weatherData.icon}@4x.png`}
                alt="weather icon"
                className="max-w-full max-h-full"
              />
            )}
          </div>

          <h1 className="text-lg font-semibold">{weatherData.city}</h1>
        </div>
        <div className="p-1 flex flex-col items-center justify-center w-40">
          <h2 className="text-7xl font-bold mt-2">
            {Math.round(weatherData.temp)}°
          </h2>

          <p className="text-lg capitalize mt-2">{weatherData.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowWeather;
