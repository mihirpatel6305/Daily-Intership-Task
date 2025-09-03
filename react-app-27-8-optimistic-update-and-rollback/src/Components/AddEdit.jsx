import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddPost, useUpdatePost } from "../hooks/usePostMutations";

function AddEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const isEditing = Boolean(state?.id);
  const postId = state?.id;

  const [formData, setFormData] = useState({
    title: state?.title || "",
    body: state?.body || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMutation = useAddPost({
    onMutate: () => {
      setFormData({ title: "", body: "" });
      navigate("/");
      setTimeout(() => setIsSubmitting(false), 0);
    },
    onSuccess: () => {
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
      setErrors({ submit: "Failed to add post. Please try again." });
    },
  });

  const editMutation = useUpdatePost({
    onMutate: () => {
      navigate("/");
      setTimeout(() => setIsSubmitting(false), 0);
    },
    onSuccess: () => {
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
      setErrors({ submit: "Failed to update post. Please try again." });
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Body is required";
    } else if (formData.body.trim().length < 10) {
      newErrors.body = "Body must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const postData = {
      title: formData.title.trim(),
      body: formData.body.trim(),
    };

    if (isEditing) {
      editMutation.mutate({
        id: postId,
        editedData: { ...postData, id: postId },
      });
    } else {
      addMutation.mutate(postData);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEditing ? "Edit Post" : "Add New Post"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter the Title"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.title
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <textarea
            value={formData.body}
            onChange={(e) => handleInputChange("body", e.target.value)}
            placeholder="Enter the Description"
            rows={4}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
              errors.body
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            disabled={isSubmitting}
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : isEditing
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Post"
              : "Add Post"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEdit;
