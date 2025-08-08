import { useState } from "react";
import "./Todo.css";

function Todo({ todo, todoList, setTodoList }) {
  const [isEdit, setIsEdit] = useState(false);
  const [prevText, setPrevText] = useState(todo?.text);

  function handleSave() {
    const editedTodoList = todoList.map((t) =>
      t.id === todo.id ? { ...t, text: prevText } : t
    );
    setTodoList(editedTodoList);
    setIsEdit(false);
  }

  function handleDelete() {
    const updatedList = todoList.filter((t) => t.id !== todo.id);
    setTodoList(updatedList);
  }

  function handleComplete() {
    const editedTodoList = todoList.map((t) =>
      t.id === todo.id ? { ...t, completed: true } : t
    );
    setTodoList(editedTodoList);
  }

  function handleInComplete() {
    const editedTodoList = todoList.map((t) =>
      t.id === todo.id ? { ...t, completed: false } : t
    );
    setTodoList(editedTodoList);
  }

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEdit ? (
        <input
          type="text"
          value={prevText}
          onChange={(e) => setPrevText(e.target.value)}
        />
      ) : (
        <p className="todo-text">{prevText}</p>
      )}

      <div className="todo-buttons">
        {todo?.completed ? (
          <button onClick={handleInComplete} className="incomplete">
            Incomplete
          </button>
        ) : (
          <button onClick={handleComplete} className="complete">
            Complete
          </button>
        )}

        {!isEdit ? (
          <button onClick={() => setIsEdit(true)} className="edit">
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="save">
            Save
          </button>
        )}

        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
