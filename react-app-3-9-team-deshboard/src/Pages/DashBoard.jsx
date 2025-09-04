import { getAllUsers, getPostsByUserId } from "../api/postsService";
import UserCard from "../Components/UserCard";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function DashBoard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    console.error("error:", error);
    return <div>Error:{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {allUsers.map((user) => (
        <UserCard key={user.id} user={user} onClick={handleUserCardClick} />
      ))}
    </div>
  );
}

export default DashBoard;
