import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../api/simulatedPostsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPosts = queryClient.getQueryData(["posts"]);

      console.log("previousPosts>>", previousPosts);
      queryClient.setQueryData(["posts"], (prev) => {
        return [...(prev || []), { id: new Date().toISOString(), ...newPost }];
      });

      navigate("/");
      return { previousPosts };
    },
    onError: (_err, _newPost, context) => {
      console.log("error>>", _err);
      queryClient.setQueryData(["posts"], context?.previousPosts);
      alert("something Error in Adding post");
    },
    // onSuccess: () => {
    //   console.log("post Added Successfully");
    //   queryClient.invalidateQueries(["posts"]);
    // },
    onSuccess: (data, variables, context) => {
      // No need to invalidate if you already added optimistically
      console.log("post Added Successfully", data);
    },
  });

  function handleAdd(e) {
    e.preventDefault();
    if (formData.title.length > 0 || formData.body.length > 0) {
      mutation.mutate({ ...formData });
      setFormData({ title: "", body: "" });
    } else {
      alert("Enter Valid Inputs");
    }
  }
  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Post</h2>
      <form onSubmit={handleAdd} className="flex flex-col gap-4">
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
          className="bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
