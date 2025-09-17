import { useEffect, useState } from "react";
import { getAllUsers } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersList from "../components/UsersList";
import { disconnectSocket, initSocket } from "../services/socketService";
import { addMessage, clearMessages } from "../feature/messageSlice";

function Home() {
  const [users, setUsers] = useState([]);
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUserId = loggedInUser?._id;

  useEffect(() => {
    if (!loggedInUserId) return;

    const socket = initSocket(loggedInUserId);

    socket.on("private-message", (msg) => {
      dispatch(addMessage(msg));
    });

    return () => {
      disconnectSocket();
      dispatch(clearMessages());
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
    disconnectSocket();
    dispatch(clearMessages());
    localStorage.clear("token");
    navigate("/login");
  };

  if (!loggedInUser) return <p>Loading user info...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-4 bg-green-600 text-white">
          <h1 className="text-lg font-bold">Chat App</h1>
          <button
            onClick={handleLogout}
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
    </div>
  );
}

export default Home;
