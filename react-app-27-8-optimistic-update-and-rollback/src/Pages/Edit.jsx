import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePost } from "../api/simulatedPostsApi";

function Edit() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const id = state.id;
  const [formData, setFormData] = useState({
    title: state?.title || "",
    body: state.body || "",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePost,
    onMutate: async ({ id, editedData }) => {
      await queryClient.cancelQueries(["posts"]);

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (prev) => {
        if (!prev) return [];
        return prev.map((post) =>
          post.id === id ? { ...post, ...editedData } : post
        );
      });

      console.log("updated postes>>>", queryClient.getQueryData(["posts"]));
      navigate("/");

      return { previousPosts };
    },
    onError: (_err, _newPost, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
      // console.log("error>>", _err);
      alert("Something error in Update");
    },
    onSuccess: () => {
      console.log("edited successfully");
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleEdit = (e) => {
    e.preventDefault();
    mutation.mutate({
      id,
      editedData: { id, title: formData.title, body: formData.body },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Post</h2>
      <form onSubmit={handleEdit} className="flex flex-col gap-4">
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter the Title"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={formData.body}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, body: e.target.value }))
          }
          placeholder="Enter the Description"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Edit Post
        </button>
      </form>
    </div>
  );
}

export default Edit;
