import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/simulatedPostsApi";

function Delete() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = Number(id);

  const mutation = useMutation({
    mutationFn: deletePost,

    onMutate: async (id) => {
      await queryClient.cancelQueries(["posts"]);

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (prev) => {
        return prev.filter((post) => post.id !== id);
      });
      
      navigate("/");
      return { previousPosts };
    },

    onError: (_err, _newPost, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  function handleDelete() {
    mutation.mutate(numericId);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Delete Confirmation
        </h1>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
