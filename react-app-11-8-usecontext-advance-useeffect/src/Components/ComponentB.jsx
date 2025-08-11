import { useContext } from "react";
import { themeContext } from "../App";
import ComponentC from "./ComponentC";

function ComponentB() {
  const theme = useContext(themeContext);

  return (
    <div
      className={`border-2 rounded-xl p-2 ${
        theme === "dark"
          ? "bg-red-400 border-red-800"
          : "bg-red-50 border-red-300"
      }`}
    >
      <h1>Component B</h1>
      <ComponentC />
    </div>
  );
}
export default ComponentB;
