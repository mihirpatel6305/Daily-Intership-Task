import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { addMessage } from "../feature/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { sendImageMessage } from "../api/messages";

function ChatInput({ input, setInput }) {
  const socket = useSocket();
  const [selectedFile, setSelectedFile] = useState(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  const location = useLocation();
  const selectedUser = location.state?.user;

  function handleInputChange(e) {
    setInput(e.target.value);
    if (!isTypingRef.current) {
      socket.emit("start_typing", {
        senderId: loggedInUserId,
        receiverId: selectedUser._id,
      });
      isTypingRef.current = true;
    }

    // clear timeout for every change to reset timer
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        senderId: loggedInUserId,
        receiverId: selectedUser._id,
      });
      isTypingRef.current = false;
    }, 2000);
  }

  async function handleSend() {
    if (selectedFile) {
      console.log("call api for sending image");
      const res = await sendImageMessage(selectedUser._id, selectedFile);

      console.log("newMessage>>", res);
      if (res.statusText == "OK") {
        const newMessage = res.data.newMessage;
        dispatch(
          addMessage({
            receiverId: selectedUser._id,
            message: newMessage,
          })
        );
      }

      setSelectedFile(null);
    } else {
      if (!input.trim()) return;

      if (!socket || !socket.connected) {
        console.log("Socket is not connected yet!");
        return;
      }

      const message = {
        senderId: loggedInUserId,
        receiverId: selectedUser._id,
        text: input,
      };

      socket.emit("message", message);

      dispatch(
        addMessage({
          receiverId: selectedUser?._id,
          message,
        })
      );

      setInput("");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="flex-grow border rounded-full px-4 py-2 focus:outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="hidden"
      />

      <span
        className="cursor-pointer text-blue-500 font-bold border-2 rounded-md p-2"
        onClick={() => fileInputRef.current.click()}
      >
        i
      </span>

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
