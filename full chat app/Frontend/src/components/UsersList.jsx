import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UsersList({ users }) {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  return (
    <div className="overflow-y-auto max-h-[500px]">
      <ul>
        {users.map((user) => {
          const isCurrentUser = user._id === loggedInUserId;

          return (
            <li
              key={user._id}
              className={`flex items-center gap-3 p-3 rounded-md mb-1 cursor-pointer hover:bg-gray-200 transition ${
                isCurrentUser ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                !isCurrentUser && navigate("/chatWindow", { state: { user } })
              }
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{user.name}</span>
                {!isCurrentUser && (
                  <span className="text-sm text-gray-500">Click to chat</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
