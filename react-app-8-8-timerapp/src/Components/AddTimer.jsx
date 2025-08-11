import { useState } from "react";

function AddTimer({ setTimers }) {
  const [inputCount, setInputCount] = useState("00:00:00");
  function handleAdd() {
    if (inputCount) {
      let [hours, minutes, seconds] = inputCount.split(":").map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const newTimer = {
        id: new Date(),
        count: totalSeconds,
        isPause: false,
        resetValue:totalSeconds,
      };
      setTimers((prev) => [...prev, newTimer]);
      setInputCount("00:00:00");
    }
    }
  return (
    <div className="flex items-center gap-4">
      <input
        type="time"
        step="1"
        value={inputCount}
        onChange={(e) => setInputCount(e.target?.value)}
        className="border-2 border-blue-500 rounded-md px-4 py-2 text-lg bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      { inputCount !== "00:00:00" && (
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-6 py-2 rounded-md text-lg hover:bg-green-700 transition"
        >
          Start
        </button>
      )}
    </div>
  );
}

export default AddTimer;
