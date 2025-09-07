import { useParams } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { getPostsByUserId } from "../api/postsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PostCardSkeleton from "../Components/Skeleton/PostCardSkeleton";

function UserPosts() {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUserId(userId),
    enabled: !!userId,
    initialData: () => queryClient.getQueryData(["posts", userId]),
  });

  if (isError) {
    console.error("error>>", error);
    return <div className="text-red-800">Error In Fetching Posts</div>;
  }
  const showSkeleton = isLoading;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {showSkeleton
        ? Array(10)
            .fill(0)
            .map((_, idx) => <PostCardSkeleton key={idx} />)
        : posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

export default UserPosts;
