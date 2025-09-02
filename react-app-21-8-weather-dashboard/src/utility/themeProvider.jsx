import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return children;
}

export default ThemeProvider;
