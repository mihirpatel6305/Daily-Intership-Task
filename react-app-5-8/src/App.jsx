import { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Status from "./components/Status/Status";
import Counter from "./components/Counter";

function App() {
  const [status, setStatus] = useState("in-progress");
  const [showStatus, setShowStatus] = useState(false);

  function handleStatusChange(e) {
    console.log("event>>", e);
    setStatus(e.target.value);
  }
  return (
    <div>
      <Counter />

      <Form />

      <button onClick={() => setShowStatus((prev) => !prev)}>
        {showStatus ? "Hide Status" : "Show Status"}
      </button>
      {showStatus && (
        <>
          <select onChange={handleStatusChange}>
            <option value="in-progress">In Progress</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>

          <Status status={status} />
        </>
      )}
    </div>
  );
}

export default App;
