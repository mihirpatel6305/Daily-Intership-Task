import Search from "./Components/Search";
import ShowWeather from "./Components/ShowWeather";
import ShowForecast from "./Components/ShowForecast";


function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-bg text-fg">

      <h1 className="text-4xl font-bold mb-6">Weather Dashboard</h1>

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

