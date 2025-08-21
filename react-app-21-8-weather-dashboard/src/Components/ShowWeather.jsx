import { useSelector } from "react-redux";
import weather from "../api/weather";
import { WEATHER_ICON_URL } from "../config";
import formatWeatherData from "../utility/formatWeatherData";

function ShowWeather() {
  const { data, isError, isLoading, error } = weather();
  const weatherData = formatWeatherData(data);
  const theme = useSelector((state) => state.theme);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div
          className={` rounded-2xl shadow-lg w-110 p-6 flex flex-col items-center ${
            theme === "dark"
              ? "bg-blue-950 text-white"
              : "bg-blue-600 text-white"
          }`}
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
          className={` rounded-2xl shadow-lg w-110 p-6 flex flex-col items-center ${
            theme === "dark"
              ? "bg-red-700 text-red-100"
              : "bg-red-100 text-red-700"
          }`}
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
          className={` rounded-2xl shadow-lg w-110 p-6 flex flex-col items-center text-xl ${
            theme === "dark"
              ? "bg-gray-600 text-gray-100"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <p className="font-semibold">No weather data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center ">
      <div
        className={` rounded-2xl shadow-lg w-110 p-6 flex flex-row justify-around  ${
          theme === "dark"
            ? "bg-blue-400 text-gray-700"
            : "bg-blue-600 text-white"
        }`}
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

          <h1
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-gray-700" : "text-white"
            }`}
          >
            {weatherData.city}
          </h1>
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
