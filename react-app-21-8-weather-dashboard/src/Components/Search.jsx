import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cityActions } from "../features/citySlice";
import { themeActions } from "../features/themeSlice";

function Search() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      dispatch(cityActions.changeCity(inputValue.trim()));
    }
  }

  function handleSearchClick() {
    if (inputValue.trim() !== "") {
      dispatch(cityActions.changeCity(inputValue.trim()));
    }
  }

  function toggleTheme() {
    dispatch(themeActions.toggleTheme());
  }

  return (
    <div className="flex items-center w-full">
      <div
        className={`flex items-center shadow-md rounded-full px-4 py-2 w-full ${
          theme === "dark" ? "bg-gray-600" : "bg-white"
        }`}
      >
        <SearchIcon
          className={`w-5 h-5  mr-2 ${
            theme === "dark" ? "text-gray-50" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search city"
          className={`w-full bg-transparent outline-none ${
            theme === "dark"
              ? "text-gray-300 placeholder-gray-50"
              : "text-gray-700 placeholder-gray-400"
          }`}
        />
        <button
          onClick={handleSearchClick}
          className={`ml-2 px-4 py-1 rounded-full transition${
            theme === "dark"
              ? "text-blue-950 bg-blue-200 hover:bg-blue-300"
              : " text-white bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Search
        </button>
        <button
          onClick={toggleTheme}
          className={`ml-2 px-4 py-1  rounded-full  transition ${
            theme === "dark"
              ? "text-blue-950 bg-blue-200 hover:bg-blue-300"
              : " text-white bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {theme === "dark" ? "Light" : "dark"}
        </button>
      </div>
    </div>
  );
}

export default Search;
