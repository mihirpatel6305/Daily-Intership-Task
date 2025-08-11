import { useContext } from "react";
import ComponentB from "./ComponentB";
import { themeContext } from "../App";

function ComponentA() {
  const theme = useContext(themeContext);
  return (
    <div
      className={`border-2 rounded-xl p-3 ${
        theme === "dark" ? "bg-blue-900" : "bg-blue-100"
      }`}
    >
      <h1>Component A</h1>
      <ComponentB />
    </div>
  );
}
export default ComponentA;
