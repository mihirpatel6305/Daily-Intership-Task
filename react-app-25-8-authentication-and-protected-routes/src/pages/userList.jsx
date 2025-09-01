import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/userApi";
import { useDispatch } from "react-redux";
import { usersActions } from "../features/usersSlice";

function UserList() {
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const {
    data: res,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    enabled: !!token,
  });

  const users = res?.data?.data;
  if (users) {
    dispatch(usersActions.setUsers(users));
  }

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">Loading ...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users?.length > 0 ? (
        users?.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={user?.avatar}
              alt={user?.first_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">ID:</span> {user?.id}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center col-span-full text-gray-500">
          No User Data Available
        </div>
      )}
    </div>
  );
}

export default UserList;
