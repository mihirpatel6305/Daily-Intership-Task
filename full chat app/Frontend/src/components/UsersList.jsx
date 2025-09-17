import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UsersList({ users }) {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  const onlineUser = useSelector((state) => state.user.onlineUser);
  const usersWithOnlineStatus = users.map((user) => ({
    user,
    isOnline: onlineUser.includes(user._id),
  }));

  console.log(usersWithOnlineStatus);

  return (
    <div className="overflow-y-auto max-h-[500px]">
      <ul>
        {usersWithOnlineStatus.map((userObj) => {
          return (
            <li
              key={userObj.user._id}
              className="flex items-center gap-3 p-3 rounded-md mb-1 cursor-pointer hover:bg-gray-200 transition"
              onClick={() =>
                navigate("/chatWindow", { state: { user: userObj?.user } })
              }
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                {userObj?.user?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {userObj?.user.name}
                </span>
                <span className="text-sm text-gray-500">Click to chat</span>
              </div>

              {userObj.isOnline && (
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
