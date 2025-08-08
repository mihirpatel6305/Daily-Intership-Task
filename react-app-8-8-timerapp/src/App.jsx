import { useEffect, useState } from "react";
import AddTimer from "./Components/AddTimer";
import DisplayTimer from "./Components/DisplayTimer";

function App() {
  const [timers, setTimers] = useState(
    JSON.parse(localStorage.getItem("timers")) || []
  );

  // Storing in localStorage
  localStorage.setItem("timers", JSON.stringify(timers));

  useEffect(() => {
    const intevalId = setInterval(() => {
      const newTimers = timers.map((timer) => {
        if (!timer?.isPause && timer?.count !== 0) {
          return { ...timer, count: timer.count - 1 };
        }
        return timer;
      });
      setTimers(newTimers);
    }, 1000);

    // Stop interval when all timer is become 0.
    const ExitstingTimers = timers.filter(
      (timer) => timer.count > 0 && !timer?.isPause
    );
    if (ExitstingTimers.length <= 0) {
      clearInterval(intevalId);
    }

    // Clear interval before unmount component
    return () => {
      clearInterval(intevalId);
    };
  }, [timers]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-950 px-4">
      <div className="w-full max-w-6xl h-[90vh] bg-white/5 rounded-xl shadow-md p-6 flex flex-col">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Timer App
        </h1>

        <div className="flex flex-col gap-6 flex-grow bg-white/10 rounded-xl p-6 overflow-hidden">
          <div className="flex justify-center">
            <AddTimer setTimers={setTimers} />
          </div>

          <div className="flex flex-wrap justify-center gap-4 overflow-y-auto">
            {timers.map((timer, index) => (
              <DisplayTimer
                key={index}
                timer={timer}
                timers={timers}
                setTimers={setTimers}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
