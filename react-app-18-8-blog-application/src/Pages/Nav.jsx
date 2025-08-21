import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-lg font-bold text-slate-800 dark:text-white">
        Home
      </div>

      <button onClick={()=>navigate('/add')} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
        Create Page +
      </button>
    </nav>
  );
}

export default Nav;
