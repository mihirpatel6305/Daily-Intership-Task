import { useContext } from "react";
import { themeContext } from "../App";

function ComponentD() {
  const theme = useContext(themeContext);
  return (
    <div
      className={`border-2 rounded-xl p-2 ${
        theme === "dark"
          ? "bg-indigo-400 border-indigo-600"
          : "bg-indigo-200 border-indigo-400"
      }`}
    >
      <h1>Component D</h1>
      <div className="p-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eveniet
        quasi dicta consequuntur pariatur quia necessitatibus, sit in explicabo
        ex sequi, quo nulla ipsa eius harum cupiditate. Laborum, itaque
        cupiditate.
      </div>
    </div>
  );
}
export default ComponentD;
