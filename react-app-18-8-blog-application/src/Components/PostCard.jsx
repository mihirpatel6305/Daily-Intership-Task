import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const { id, title, body, userId } = post;
  const nevigate = useNavigate();
  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          User #{userId}
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Post {id}
        </span>
      </div>

      <h3 className="mb-1 text-base font-semibold leading-snug text-slate-900 dark:text-white line-clamp-2">
        {title}
      </h3>

      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 whitespace-pre-line">
        {body}
      </p>

      <div className="flex items-center justify-between">
        <span
          onClick={() => nevigate(`/detail/${id}`, { state: { post } })}
          className="cursor-pointer inline-block text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Read more →
        </span>

        <div className="flex gap-3">
          <button
            onClick={() => nevigate(`/edit/${id}`, { state: { post } })}
            className="rounded-lg border border-blue-400 px-3 py-1 text-xs font-medium text-blue-600 bg-transparent 
             hover:bg-blue-100 active:scale-95 
             dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            Edit
          </button>

          <button
            onClick={() => nevigate(`/delete/${id}`, { state: { post } })}
            className="rounded-lg border border-red-400 px-3 py-1 text-xs font-medium text-red-600 bg-transparent 
             hover:bg-red-100 active:scale-95 
             dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
