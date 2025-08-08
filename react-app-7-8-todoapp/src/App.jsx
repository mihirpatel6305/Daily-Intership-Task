import { useState } from "react";
import Add from "./Components/Add";
import Todo from "./Components/Todo";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  localStorage.setItem("todoList",todoList);
  return (
    <div className="app-container">
      <h1>Todo Application</h1>
      <div className="add-section">
        <Add setTodoList={setTodoList} />
      </div>
      <div className="todo-list">
        {todoList.map((t, index) => (
          <Todo
            key={t.id}
            todo={t}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
