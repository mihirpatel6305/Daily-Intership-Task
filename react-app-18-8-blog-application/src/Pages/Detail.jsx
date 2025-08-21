import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/axios";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";

function Detail() {
  const allpost = useSelector((state) => state.post.posts);
  const { id } = useParams();
  const { state } = useLocation();
  const postData = state?.post
    ? state.post
    : allpost.find((post) => post.id == id);

  const [postComment, setPostComment] = useState([]);
  const [loading,setLoading] = useState(false);

  async function getPostComment() {
    try {
      setLoading(true)
      const res = await api.get(`/${id}/comments`);
      res?.data && setPostComment(res.data);
      setLoading(false);
    } catch (error) {
      console.warn("somthing is wrong to fetch comment api", error);
    }
  }

  useEffect(() => {
    getPostComment();
  }, []);
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
            {postData?.title}
          </h1>
          <p className="mb-4 whitespace-pre-line text-slate-700 dark:text-slate-300">
            {postData?.body}
          </p>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Posted by{" "}
            <span className="font-medium">User #{postData?.userId}</span>
          </div>
        </article>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Comments</h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="space-y-4">
              {postComment.length > 0 &&
                postComment.map((comment) => (
                  <div
                    key={comment?.id}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="mb-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {comment?.name}
                    </div>
                    <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                      {comment?.email}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                      {comment?.body}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Detail;
