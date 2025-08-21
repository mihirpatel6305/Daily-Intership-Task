import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Features/Posts/postSlices";
import Loader from "./Loader";
import ShowError from "./ShowError";

function AllPost() {
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.post.posts);
  const isLoading = useSelector((state) => state.post.loading);
  const ErrorMessage = useSelector((state) => state.post.error);

  useEffect(() => {
    if (allPost.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, allPost.length]);

  return isLoading ? (
    <Loader />
  ) : ErrorMessage ? (
    <ShowError message={ErrorMessage} />
  ) : (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {allPost?.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
    </div>
  );
}

export default AllPost;
