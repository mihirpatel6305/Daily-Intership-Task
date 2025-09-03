import { useState } from "react";
import { useDeletePost } from "../hooks/usePostMutations";

function DeleteModal({ isOpen, onClose, postId }) {
  const [error, setError] = useState(null);

  const deleteMutation = useDeletePost({
    onMutate: () => {
      onClose();
    },
    onSuccess: () => {
      setError(null);
    },
    onError: () => {
      setError("Failed to delete post. Please try again.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(postId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Delete Confirmation
        </h1>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
