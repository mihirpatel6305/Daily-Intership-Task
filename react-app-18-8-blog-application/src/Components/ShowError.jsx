function ShowError({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
          Oops!
        </h2>
        <p className="text-slate-700 dark:text-slate-300">{message}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ShowError;
