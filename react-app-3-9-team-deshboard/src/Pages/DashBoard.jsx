import { getAllUsers } from "../api/postsService";
import UserCard from "../Components/UserCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "../Components/UserCardSkeleton";

function DashBoard() {
  const navigate = useNavigate();

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  function handleUserCardClick(id) {
    navigate(`/user/${id}/posts`);
  }

  if (isError) {
    console.error("error:", error);
    return <div>Error:{error}</div>;
  }

  const showSkeleton = isLoading;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {showSkeleton
        ? Array(10)
            .fill(0)
            .map((_, idx) => <UserCardSkeleton />)
        : allUsers.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleUserCardClick} />
          ))}
    </div>
  );
}

export default DashBoard;
