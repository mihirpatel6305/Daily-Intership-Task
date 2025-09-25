import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import ChatInput from "../components/ChatInput";
import ChatContainer from "../components/ChatContainer";

function ChatWindow() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  const location = useLocation();
  const selectedUser = location.state?.user;

  useEffect(() => {
    if (!socket || !loggedInUserId) return;
    // If user refresh this page then important to emit.
    const handleConnect = () => {
      socket.emit("user_connected", loggedInUserId);
    };

    // handle mark as read messages.
    if (loggedInUserId && selectedUser?._id) {
      socket.emit("mark_as_read", {
        userId: loggedInUserId,
        chatWithId: selectedUser._id,
      });
    } else {
      console.error("userId or seletedUserId is not defined");
    }

    socket.on("connect", handleConnect);
    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket, loggedInUserId]);

  //For Typing... indicator
  useEffect(() => {
    socket.on("start_typing", ({ senderId }) => {
      if (senderId && senderId == selectedUser?._id) {
        setIsTyping(true);
      }
    });

    socket.on("stop_typing", ({ senderId }) => {
      if (senderId && senderId == selectedUser?._id) {
        setIsTyping(false);
      }
    });
    return () => {
      socket.off("start_typing");
      socket.off("stop_typing");
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
        <div className="bg-green-900 text-white p-4 rounded-t-lg font-semibold flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white font-bold text-xl"
          >
            ←
          </button>
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-950 font-bold">
            {selectedUser.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-lg">{selectedUser.name}</span>
        </div>

        <ChatContainer isTyping={isTyping} />

        <div className="flex p-4 gap-2 border-t">
          <ChatInput input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
