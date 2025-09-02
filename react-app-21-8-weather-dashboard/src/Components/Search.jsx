import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cityActions } from "../features/citySlice";
import { toggleTheme } from "../features/themeSlice";

function Search() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      dispatch(cityActions.changeCity(inputValue.trim()));
    }
  };

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      dispatch(cityActions.changeCity(inputValue.trim()));
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  document.documentElement.classList.toggle("dark", theme === "dark");

  return (
    <div className="flex items-center w-full">
      <div
        className="flex items-center shadow-md rounded-full px-4 py-2 w-full"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-fg)",
        }}
      >
        <SearchIcon
          className="w-5 h-5 mr-2"
          style={{ color: "var(--color-fg)" }}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search city"
          className="w-full bg-transparent outline-none"
          style={{ color: "var(--color-fg)", caretColor: "var(--color-fg)" }}
        />
        <button
          onClick={handleSearchClick}
          className="ml-2 px-4 py-1 rounded-full transition"
          style={{
            backgroundColor: "var(--color-brand)",
            color: "var(--color-loading-text)",
          }}
        >
          Search
        </button>
      </div>
      <button
        onClick={handleToggleTheme}
        className="ml-2 px-4 py-1 rounded-sm transition"
        style={{
          backgroundColor: "var(--color-brand)",
          color: "var(--color-loading-text)",
        }}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default Search;
