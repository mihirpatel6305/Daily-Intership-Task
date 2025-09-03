import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/simulatedPostsApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

function DisplayPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">No posts found.</div>
    );
  }


  return (
    <>
      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-2"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.body}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => navigate(`/edit/${post.id}`, { state: post })}
                className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(post)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        postId={postToDelete?.id}
      />
    </>
  );
}

export default DisplayPosts;
