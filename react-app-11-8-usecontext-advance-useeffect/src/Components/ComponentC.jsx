import { useContext } from "react";
import ComponentD from "./ComponentD";
import { themeContext } from "../App";

function ComponentC() {
  const theme = useContext(themeContext);
  return (
    <div
      className={`border-2 rounded-xl p-2 ${
        theme === "dark"
          ? "bg-green-800 border-green-950"
          : "bg-green-200 border-green-400"
      }`}
    >
      <h1>Component C</h1>
      <ComponentD />
    </div>
  );
}
export default ComponentC;
