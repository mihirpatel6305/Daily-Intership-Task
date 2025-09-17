import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../api/user";
import UsersList from "../components/UsersList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "../services/socketService";
import { setOnlineUser } from "../feature/userSlice";

function Home() {
  const [users, setUsers] = useState([]);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const navigate = useNavigate();

  const socketRef = useRef(null);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  useEffect(() => {
    if (!loggedInUserId) return;

    socketRef.current = initSocket(loggedInUserId);

    socketRef.current.on("onlineUser", (onlineUserlist) => {
      console.log("onlineUserList>>", onlineUserlist);
      dispatch(setOnlineUser(onlineUserlist));
    });

    return () => {
      if (socketRef.current) socketRef.current.off("onlineUser");
    };
  }, [loggedInUserId, dispatch]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUser = await getAllUsers();
        setUsers(allUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleLogout = () => {
    if (socketRef.current) {
      console.log("socket disconnected");
      socketRef.current.disconnect();
    }
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-5 bg-green-900 text-white rounded-t-lg">
          <h1 className="text-lg font-bold">Chat App</h1>
          <button
            onClick={() => setIsOpenLogout(true)}
            className="bg-red-500 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>

        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none text-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <UsersList users={users} />
        </div>
      </div>
      {isOpenLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpenLogout(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
