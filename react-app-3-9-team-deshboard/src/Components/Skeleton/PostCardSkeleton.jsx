import Skeleton from "react-loading-skeleton";

function PostCardSkeleton() {
  return (
    <div className="w-96 cursor-pointer bg-gradient-to-b from-gray-50 to-white border border-gray-300 rounded-lg shadow p-6 m-3">
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
  );
}
export default PostCardSkeleton;
