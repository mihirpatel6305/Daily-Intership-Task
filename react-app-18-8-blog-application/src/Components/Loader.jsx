function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-slate-100 rounded-full animate-spin"></div>
        <p className="text-slate-700 dark:text-slate-300 text-lg font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loader;
