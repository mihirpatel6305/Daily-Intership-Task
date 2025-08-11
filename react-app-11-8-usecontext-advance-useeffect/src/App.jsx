import { createContext, useEffect, useState } from "react";
import ComponentA from "./Components/ComponentA";

export const themeContext = createContext();

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme ? JSON.parse(storedTheme) : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <themeContext.Provider value={theme}>
      <div
        className={`p-3 m-2 border-2 rounded-2xl ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <button
          className={` p-2 m-1 rounded-xl border ${theme === 'dark' ? 'bg-amber-800 border-amber-950':'bg-amber-200 border-amber-400'}`}
          onClick={() => {
            if (theme === "dark") {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        >
          Toggle Theme
        </button>
        <ComponentA />
      </div>
    </themeContext.Provider>
  );
}

export default App;
