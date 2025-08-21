import Add from "./pages/AddTodo";
import AllTodos from "./pages/AllTodos";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-white shadow-md py-3">
        <h1 className="text-3xl font-semibold text-center">Todo Manager</h1>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <Add />
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex-1 flex flex-col max-h-[60vh]">
          {/* <h2 className="text-xl font-semibold mb-4">All Todos</h2> */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <AllTodos />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
