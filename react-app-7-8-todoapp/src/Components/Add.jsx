import { useState } from "react";
import "./Add.css";

function Add({ setTodoList }) {
  const [inputText, setInputText] = useState("");

  function handleClick() {
    if (inputText) {
      const newTodo = {
        id: new Date(),
        text: inputText,
        completed: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
    } else {
      console.log("add toaster for field is empty");
    }
    setInputText("");
  }

  return (
    <div className="add-container">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={inputText}
        onChange={(e) => setInputText(e?.target?.value)}
      />
      <button onClick={handleClick}>+</button>
    </div>
  );
}

export default Add;
