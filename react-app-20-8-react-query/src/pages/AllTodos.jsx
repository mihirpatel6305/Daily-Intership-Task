import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const BaseURL = import.meta.env.VITE_BASE_URL;

function AllTodos() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("all");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(BaseURL);
      return res.data;
    },
  });

  const updateTodo = useMutation({
    mutationFn: async (updatedTodo) => {
      const res = await axios.put(`${BaseURL}/${updatedTodo.id}`, updatedTodo);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setEditingId(null);
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${BaseURL}/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setDeleteId(null);
    },
  });

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const handleSave = (todo) => {
    updateTodo.mutate({ ...todo, title: editValue });
  };

  const handleToggleComplete = (todo) => {
    updateTodo.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteTodo.mutate(deleteId);
    }
  };

  const filteredTodos =
    data?.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    }) || [];

  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-600 font-medium">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-6 text-red-600 font-medium">
        {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No todos found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo?.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow transition"
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 border rounded px-2 py-1"
                />
              ) : (
                <span
                  className={`flex-1 text-gray-800 ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className={`text-sm px-3 py-1 rounded ${
                    todo.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Completed"}
                </button>

                {editingId === todo.id ? (
                  <button
                    onClick={() => handleSave(todo)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="text-sm bg-gray-200 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDeleteClick(todo.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <p className="text-gray-800 font-medium">
              Are you sure you want to delete this todo?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTodos;
