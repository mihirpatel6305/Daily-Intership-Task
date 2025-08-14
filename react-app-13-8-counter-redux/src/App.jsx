import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./feature/counterSlice";
import { toggleTheme } from "./feature/themeSlice";

function App() {
  const count = useSelector((state) => state?.count);
  const theme = useSelector((state) => state?.theme?.mode);
  const dispatch = useDispatch();

  return (
    <div
      className={`flex justify-center items-center max-w-full h-dvh ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div
        className={`border-2 rounded-2xl w-96 h-40 ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        } `}
      >
        <h1 className="p-4 text-center text-4xl">Count is: {count}</h1>
        <div className="text-center p-4">
          <button
            className={`border-2 rounded-xl mx-1 p-2 ${
              theme === "dark"
                ? "bg-green-900 text-green-300"
                : "bg-green-200 text-green-900"
            } `}
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            className={`border-2 rounded-xl mx-1 p-2 ${
              theme === "dark"
                ? "bg-red-800 text-red-300"
                : "bg-red-200 text-red-900"
            } `}
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
          <button
            className={`border-2 rounded-xl mx-1 p-2 ${
              theme === "dark"
                ? "bg-gray-400 text-gray-900"
                : "bg-gray-800 text-gray-50"
            } `}
            onClick={() => dispatch(toggleTheme())}
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
