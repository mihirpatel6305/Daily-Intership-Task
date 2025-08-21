import { useSelector } from "react-redux";
import { WEATHER_ICON_URL } from "../config";

function ForecastCard({ data }) {
  if (!data) return null;
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className={`flex flex-col items-center  shadow rounded-2xl p-3 w-20 ${
        theme === "dark" ? "bg-blue-600" : "bg-blue-200"
      }`}
    >
      <p
        className={`font-medium  ${
          theme === "dark" ? "text-gray-100" : "text-gray-700"
        }`}
      >
        {data?.day}
      </p>

      {data.icon && (
        <img
          src={`${WEATHER_ICON_URL}${data.icon}@2x.png`}
          alt="weather icon"
          className="w-12 h-12"
        />
      )}
      <p
        className={`font-semibold  ${
          theme === "dark" ? "text-gray-50" : "text-gray-900"
        }`}
      >
        {Math.round(data.temp)}°
      </p>
    </div>
  );
}

export default ForecastCard;
