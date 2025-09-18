import { useNavigate } from "react-router-dom";

function UsersList({ users }) {
  const navigate = useNavigate();

  if (!users || users.length < 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg font-medium bg-gray-100 rounded-md shadow-sm">
        No users available
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[500px]">
      <ul>
        {users.map((user) => {
          return (
            <li
              key={user._id}
              className="flex items-center gap-3 p-3 rounded-md mb-1 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => navigate("/chatWindow", { state: { user } })}
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{user?.name}</span>
                <span className="text-sm text-gray-500">Click to chat</span>
              </div>

              {user?.isOnline && (
                <span className="ml-auto text-green-500 font-medium">
                  Online
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
