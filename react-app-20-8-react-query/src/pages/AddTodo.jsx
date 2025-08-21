import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const BaseURL = import.meta.env.VITE_BASE_URL;

function Add() {
  const [inputTodo, setInputTodo] = useState("");
  const queryClient = useQueryClient();

  async function addTodo(newTodo) {
    await axios.post(BaseURL, newTodo);
  }

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.error("error in post todo>>", error);
    },
  });

  function handleAdd() {
    if (!inputTodo.trim()) return;
    mutation.mutate({ title: inputTodo, completed: false });
    setInputTodo("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleAdd}
          disabled={mutation.isPending}
          className={`rounded-lg px-4 py-2 font-medium shadow transition ${
            mutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {mutation.isPending ? "Adding..." : "+"}
        </button>
      </div>

      {mutation.isError && (
        <p className="text-red-600 text-sm">Failed to add todo. Try again.</p>
      )}

      {mutation.isSuccess && (
        <p className="text-green-600 text-sm">Todo added successfully!</p>
      )}
    </div>
  );
}

export default Add;
