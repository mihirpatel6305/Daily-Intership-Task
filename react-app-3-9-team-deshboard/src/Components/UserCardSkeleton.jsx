import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserCardSkeleton() {
  return (
    <div className="w-80 cursor-pointer bg-gradient-to-b from-gray-50 to-white border border-gray-300 rounded-lg shadow p-6 m-3">
      <Skeleton height={24} width="70%" className="mb-2 rounded" />

      <Skeleton height={18} width="50%" className="mb-4 rounded" />

      <Skeleton height={16} width="80%" className="mb-2 rounded" />

      <Skeleton height={16} width="70%" className="mb-2 rounded" />

      <Skeleton height={16} width="60%" className="mb-4 rounded" />

      <Skeleton height={20} width="30%" className="mb-2 rounded" />

      <Skeleton height={16} width="85%" className="mb-1 rounded" />
      <Skeleton height={16} width="75%" className="mb-4 rounded" />

      <Skeleton height={20} width="35%" className="mb-2 rounded" />

      <Skeleton height={16} width="60%" className="mb-1 rounded" />

      <Skeleton height={14} width="90%" className="italic mb-1 rounded" />
    </div>
  );
}

export default UserCardSkeleton;
