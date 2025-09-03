import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost, updatePost, deletePost } from "../api/simulatedPostsApi";

const POSTS_QUERY_KEY = ["posts"];

export function useAddPost({ onSuccess, onError, onMutate } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(POSTS_QUERY_KEY);
      const previousPosts = queryClient.getQueryData(POSTS_QUERY_KEY);
      const tempId = `temp-${Date.now()}`;
      
      queryClient.setQueryData(POSTS_QUERY_KEY, (prev) => {
        return [...(prev || []), { id: tempId, ...newPost }];
      });

      onMutate?.(newPost);
      return { previousPosts, tempId };
    },
    onError: (error, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(POSTS_QUERY_KEY, context.previousPosts);
      }
      onError?.(error, variables, context);
    },
    onSuccess: (newPost, variables, context) => {
      queryClient.setQueryData(POSTS_QUERY_KEY, (prev) => {
        return prev.map((post) => 
          post.id === context.tempId ? newPost : post
        );
      });
      onSuccess?.(newPost, variables, context);
    },
  });
}

export function useUpdatePost({ onSuccess, onError, onMutate } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onMutate: async ({ id, editedData }) => {
      await queryClient.cancelQueries(POSTS_QUERY_KEY);
      const previousPosts = queryClient.getQueryData(POSTS_QUERY_KEY);

      queryClient.setQueryData(POSTS_QUERY_KEY, (prev) => {
        if (!prev) return [];
        return prev.map((post) =>
          post.id === id ? { ...post, ...editedData } : post
        );
      });

      onMutate?.({ id, editedData });
      return { previousPosts };
    },
    onError: (error, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(POSTS_QUERY_KEY, context.previousPosts);
      }
      onError?.(error, variables, context);
    },
    onSuccess: (updatedPost, { editedData }, context) => {
      queryClient.setQueryData(POSTS_QUERY_KEY, (prev) => {
        if (!prev) return [];
        return prev.map((post) =>
          post.id === editedData.id ? { ...post, ...updatedPost } : post
        );
      });
      onSuccess?.(updatedPost, { editedData }, context);
    },
  });
}

export function useDeletePost({ onSuccess, onError, onMutate } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries(POSTS_QUERY_KEY);
      const previousPosts = queryClient.getQueryData(POSTS_QUERY_KEY);

      queryClient.setQueryData(POSTS_QUERY_KEY, (prev) => {
        return prev.filter((post) => post.id !== id);
      });

      onMutate?.(id);
      return { previousPosts };
    },
    onError: (error, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(POSTS_QUERY_KEY, context.previousPosts);
      }
      onError?.(error, variables, context);
    },
    onSuccess: (result, variables, context) => {
      onSuccess?.(result, variables, context);
    },
  });
}
