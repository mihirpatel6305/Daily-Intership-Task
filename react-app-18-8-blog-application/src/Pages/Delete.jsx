import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { postActions } from "../Features/Posts/postSlices";
import { useState } from "react";

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await api.delete(`/${id}`);
      dispatch(postActions.removePost(Number(id)));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.warn("something is wrong in Delete Post", error);
    }
  }
  return (
    <main className="min-h-[91vh] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Delete Post</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md transition
                   hover:bg-red-600 active:scale-95"
          >
            {loading ? <span>Deleting ...</span> : <span>Yes, Delete</span>}
          </button>

          {!loading && (
            <button
              onClick={() => navigate(`/detail/${id}`)}
              className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-700
                   bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200
                   font-medium shadow-sm transition hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Delete;
