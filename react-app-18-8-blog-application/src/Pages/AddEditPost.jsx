import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { fetchPosts } from "../Features/Posts/postSlices";
import { useDispatch } from "react-redux";

function AddEditPost() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const postData = state?.post;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      setIsLoading(true)
      if (id) {
        await api.patch(`/${id}`, data);
      } else {
        await api.post("/", data);
      }
      await dispatch(fetchPosts());
      setIsLoading(false)
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    if (postData) {
      reset(postData);
    }
  }, [postData, reset]);
  return (
    <main className="min-h-[91vh]  bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {id ? "Edit Post" : "Add New Post"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "Title is Required" })}
              placeholder="Enter Title"
              className={`w-full px-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "border-slate-300 dark:border-slate-700 focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Body</label>
            <textarea
              {...register("body", { required: "Body is Required" })}
              placeholder="Write your post content..."
              rows={6}
              className={`w-full px-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 ${
                errors.body
                  ? "border-red-500 focus:ring-red-400"
                  : "border-slate-300 dark:border-slate-700 focus:ring-blue-500"
              }`}
            ></textarea>
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? "Submiting ..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddEditPost;
