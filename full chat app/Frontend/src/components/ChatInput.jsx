import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { addMessage } from "../feature/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { sendImageMessage } from "../api/messages";

function ChatInput({ input, setInput }) {
  const socket = useSocket();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [closePreview, setClosePreview] = useState(true);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  const location = useLocation();
  const selectedUser = location.state?.user;

  // handle text input change
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
    }, 1000);
  }

  // handling text and image send
  async function handleSend() {
    if (selectedFile) {
      setIsSending(true);
      try {
        setClosePreview(true);
        const res = await sendImageMessage(selectedUser._id, selectedFile);

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
      } catch (error) {
        console.log("Error in Sending Image>>", error);
        alert("Imgae sending is faild");
      } finally {
        setIsSending(false);
      }
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
    <div className="flex flex-col gap-2">
      {selectedFile && !closePreview && (
        <div className="relative w-32 h-32">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            className="w-full h-full object-cover rounded-md border"
          />
          <button
            onClick={() => setSelectedFile(null)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600"
            title="Remove Image"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full shadow-inner">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow bg-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-200 shadow-sm"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setClosePreview(false);
          }}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          title="Attach Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h18M3 12h18M3 19h18"
            />
          </svg>
        </button>

        <button
          onClick={handleSend}
          disabled={isSending}
          className={`px-4 py-2 rounded-full text-white font-semibold transition-colors ${
            isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
