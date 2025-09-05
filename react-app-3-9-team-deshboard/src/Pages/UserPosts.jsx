import { useParams } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { getPostsByUserId } from "../api/postsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

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
            .map((_, idx) => (
              <div
                key={idx}
                className="w-96 cursor-pointer bg-gradient-to-b from-gray-50 to-white border border-gray-300 rounded-lg shadow p-6 m-3"
              >
                <Skeleton
                  height={28}
                  width="90%"
                  className="mb-4 rounded"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />

                <Skeleton
                  height={16}
                  count={5}
                  className="mb-2 rounded"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
            ))
        : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

export default UserPosts;
