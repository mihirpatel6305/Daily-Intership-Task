import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "../services/socketService";
import { addMessage } from "../feature/messageSlice";
import { useLocation, useNavigate } from "react-router-dom";

function ChatWindow() {
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const messages = useSelector((state) => state.messages.messages);
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  const location = useLocation();
  const selectedUser = location.state?.user;

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === loggedInUserId &&
        msg.receiverId === selectedUser._id) ||
      (msg.senderId === selectedUser._id && msg.receiverId === loggedInUserId)
  );

  useEffect(() => {
    if (!loggedInUserId) return;

    socketRef.current = initSocket(loggedInUserId);

    socketRef.current.on("private-message", (msg) => {
      dispatch(addMessage(msg));
    });

    return () => {
      if (socketRef.current) socketRef.current.off("private-message");
    };
  }, [loggedInUserId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  function handleSend() {
    if (!input.trim()) return;

    if (!socketRef.current) {
      console.error("Socket not initialized yet!");
      return;
    }

    const message = {
      senderId: loggedInUserId,
      receiverId: selectedUser._id,
      text: input,
    };

    socketRef.current.emit("private-message", message);
    dispatch(addMessage(message));
    setInput("");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
        <div className="bg-green-600 text-white p-4 rounded-t-lg font-semibold flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white font-bold text-xl"
          >
            ←
          </button>
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            {selectedUser.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-lg">{selectedUser.name}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredMessages.map((msg, i) => {
            const isSender = msg.senderId === loggedInUserId;
            return (
              <div
                key={i}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    isSender
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex p-4 gap-2 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border rounded-full px-4 py-2 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
