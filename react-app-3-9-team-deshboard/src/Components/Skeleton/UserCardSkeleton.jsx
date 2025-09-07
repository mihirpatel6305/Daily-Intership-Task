import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserCardSkeleton() {
  return (
    <div className="w-80 cursor-pointer bg-white border border-gray-300 rounded-2xl shadow-sm p-6 animate-pulse">
      <Skeleton height={22} width="60%" className="mb-2 rounded" />

      <Skeleton height={16} width="40%" className="mb-3 rounded" />

      <div className="space-y-1 mb-3">
        <Skeleton height={14} width="80%" className="rounded" />
        <Skeleton height={14} width="70%" className="rounded" />
        <Skeleton height={14} width="60%" className="rounded" />
      </div>

      <Skeleton height={18} width="30%" className="mb-2 rounded" />
      <Skeleton height={14} width="85%" className="mb-1 rounded" />
      <Skeleton height={14} width="75%" className="mb-3 rounded" />

      <Skeleton height={18} width="35%" className="mb-2 rounded" />
      <Skeleton height={14} width="60%" className="mb-1 rounded" />
      <Skeleton height={12} width="90%" className="italic mb-1 rounded" />
    </div>
  );
}

export default UserCardSkeleton;
