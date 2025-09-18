import { useNavigate } from "react-router-dom";

function UsersList({ users }) {
  const navigate = useNavigate();

  if (!users || users.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg font-medium bg-gray-100 rounded-md shadow-sm">
        No users available
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[500px]">
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center gap-3 p-3 rounded-md mb-1 cursor-pointer hover:bg-gray-200 transition relative"
            onClick={() => navigate("/chatWindow", { state: { user } })}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              {user?.isOnline && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <span className="font-medium text-gray-800">{user?.name}</span>
              <span className="text-sm text-gray-500">
                {user?.isOnline ? (
                  <span className="text-green-600 font-bold">Online</span>
                ) : (
                  "Offline"
                )}
              </span>
            </div>

            {user?.unreadMessages > 0 && (
              <span className="ml-auto px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                {user.unreadMessages}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
