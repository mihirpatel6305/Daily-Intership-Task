import { useSelector } from "react-redux";
import { WEATHER_ICON_URL } from "../config";

function ForecastCard({ data }) {
  if (!data) return null;
  const theme = useSelector((state) => state.theme);

  document.documentElement.classList.toggle("dark", theme === "dark");

  return (
    <div
      className="flex flex-col items-center shadow rounded-2xl p-3 w-20"
      style={{
        backgroundColor: "var(--color-card-bg)",
        color: "var(--color-fg)",
      }}
    >
      <p className="font-medium" style={{ color: "var(--color-fg)" }}>
        {data?.day}
      </p>

      {data.icon && (
        <img
          src={`${WEATHER_ICON_URL}${data.icon}@2x.png`}
          alt="weather icon"
          className="w-12 h-12"
        />
      )}

      <p className="font-semibold" style={{ color: "var(--color-fg)" }}>
        {Math.round(data.temp)}°
      </p>
    </div>
  );
}

export default ForecastCard;
