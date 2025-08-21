import Search from "./Components/Search";
import ShowWeather from "./Components/ShowWeather";
import ShowForecast from "./Components/ShowForecast";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state?.theme);
  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <h1
        className={`text-4xl font-bold  mb-6 ${
          theme === "dark" ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Weather Dashboard
      </h1>

      <div className="w-full max-w-md mb-8">
        <Search />
      </div>

      <div className="w-full max-w-md mb-8">
        <ShowWeather />
      </div>

      <div className="max-w-3xl">
        <ShowForecast />
      </div>
    </div>
  );
}

export default App;
