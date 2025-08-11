import { useState } from "react";

function DisplayTimer({ timer, timers, setTimers }) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  function handlePause() {
    if (!timer?.isPause) {
      const updatedTimers = timers.map((timerElement) => {
        if (timerElement.id === timer.id) {
          return { ...timer, isPause: true };
        }
        return timerElement;
      });
      setTimers(updatedTimers);
    }
  }

  function handleResume() {
    if (timer?.isPause) {
      const updatedTimers = timers.map((timerElement) => {
        if (timerElement.id === timer.id) {
          return { ...timer, isPause: false };
        }
        return timerElement;
      });
      setTimers(updatedTimers);
    }
  }

  function handleReset() {
    const updatedTimers = timers.map((timerElement) => {
      if (timerElement.id === timer.id) {
        return { ...timer, count: timer?.resetValue };
      }
      return timerElement;
    });
    setTimers(updatedTimers);
  }

  function handleDelete() {
    if (timer?.id) {
      const updatedTimers = timers.filter(
        (timerElement) => timerElement?.id !== timer?.id
      );
      setTimers(updatedTimers);
      setIsOpenDelete(false);
    }
  }

  function countToTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formatted = [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");

    return formatted;
  }

  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 text-center space-y-4">
      <h1 className="text-4xl font-mono font-bold text-gray-800">
        {countToTime(timer?.count)}
      </h1>

      <div className="flex justify-center gap-4 flex-wrap">
        {timer?.count <= 0 ? (
          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Dismiss
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsOpenDelete(true)}
              className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remove
            </button>

            {timer?.isPause ? (
              <button
                onClick={handleResume}
                className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Pause
              </button>
            )}

            <button
              onClick={handleReset}
              class="px-4 py-2 bg-gray-400 text-white rounded-lg border border-gray-500 hover:bg-gray-500 active:bg-gray-600 transition-colors duration-200"
            >
              Reset
            </button>
          </>
        )}
      </div>
      {isOpenDelete && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpenDelete(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayTimer;
