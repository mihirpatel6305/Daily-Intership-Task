import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  addPrevMessage,
  setMessages,
} from "../feature/messageSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { formatTime } from "../services/formatTime";
import formatDateString from "../services/formatDateString";
import { useSocket } from "../context/SocketContext";

function ChatWindow() {
  const [input, setInput] = useState("");
  const [before, setBefore] = useState(() => new Date());
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const socket = useSocket();
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loggedInUserId = loggedInUser?._id;

  const location = useLocation();
  const selectedUser = location.state?.user;

  const messages = useSelector(
    (state) => state.messages?.messages[selectedUser?._id] || []
  );

  const loading = useSelector((state) => state.messages.loading);
  const error = useSelector((state) => state.messages.error);

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

  function handleSend() {
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

  // For handling new messaages from receiver
  useEffect(() => {
    if (!socket || !socket?.connected) return;

    const handleMessage = (message) => {
      dispatch(
        addMessage({
          receiverId: message.senderId,
          message,
        })
      );
    };

    socket.on("message", handleMessage);
    socket.emit("active", {
      senderId: loggedInUserId,
      receiverId: selectedUser?._id,
    });

    return () => {
      socket.off("message", handleMessage);
      socket.emit("inActive", {
        senderId: loggedInUserId,
      });
    };
  }, [socket, socket?.connected, selectedUser?._id, loggedInUserId]);

  // Fetching initial messages
  useEffect(() => {
    socket.emit("getInitialMessages", {
      senderId: loggedInUserId,
      receiverId: selectedUser?._id,
      before,
    });

    socket.on("getInitialMessages", (messages) => {
      dispatch(setMessages({ receiverId: selectedUser?._id, messages }));
      setBefore(messages[messages?.length - 1]?.createdAt);
    });
  }, [loggedInUserId]);

  // For Prev Messages fetch
  function fetchMoreData() {
    socket.emit("getPrevMessages", {
      senderId: loggedInUserId,
      receiverId: selectedUser?._id,
      before,
    });
  }
  // Trigger fetching enent of previous messages when the user scrolls to the top
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0) {
        console.log("Reached top → fetching older messages");
        fetchMoreData();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [before]);

  // For Adding Previous messages in Redux store
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handlePrevMessages = (messages) => {
      const prevScrollHeight = container.scrollHeight;

      if (Array.isArray(messages) && messages.length > 0) {
        dispatch(addPrevMessage({ receiverId: selectedUser?._id, messages }));
        setBefore(messages[messages?.length - 1]?.createdAt);
      }

      // timeout is wait for adding new message at top.
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      }, 0);
    };

    socket.on("getPrevMessages", handlePrevMessages);

    return () => {
      socket.off("getPrevMessages", handlePrevMessages);
    };
  }, [socket, dispatch, selectedUser?._id]);

  useEffect(() => {
    // If user refresh this page then important to emit.
    if (!loggedInUserId) return;
    socket.emit("user_connected", loggedInUserId);

    // handle mark as read messages.
    if (loggedInUserId && selectedUser._id) {
      socket.emit("mark_as_read", {
        userId: loggedInUserId,
        chatWithId: selectedUser?._id,
      });
    } else {
      console.error("userId or seletedUserId is not defined");
    }
  }, [loggedInUserId]);

  // For smooth scorll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //For Typing... indicator
  useEffect(() => {
    socket.on("start_typing", ({ senderId }) => {
      console.log("senderId is>>>", senderId);
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

  if (error) return <div className="text-red-500">{error}</div>;

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

        <div
          ref={chatContainerRef}
          style={{ scrollbarWidth: "none" }}
          className="flex-1 overflow-y-auto p-4 space-y-2"
        >
          {loading ? (
            <Loader />
          ) : (
            messages.map((msg, i) => {
              const isSender = msg.senderId === loggedInUserId;
              const currentDate = formatDateString(msg.createdAt);
              const prevDate = formatDateString(messages[i - 1]?.createdAt);

              return (
                <div key={i}>
                  {(i === 0 || currentDate !== prevDate) && currentDate && (
                    <div className="text-center text-gray-500 text-sm my-2">
                      {currentDate}
                    </div>
                  )}
                  <div
                    className={`flex ${
                      isSender ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-lg text-sm leading-snug ${
                        isSender
                          ? "bg-green-200 text-gray-900 rounded-bl-lg rounded-tr-none"
                          : "bg-gray-200 text-gray-900 rounded-br-lg rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-end gap-2">
                        <span className="break-words">{msg.text}</span>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">
                          {msg?.createdAt
                            ? formatTime(msg?.createdAt)
                            : formatTime(new Date())}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {isTyping && (
            <div className="flex items-center gap-1 px-2 pt-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-600"
                  style={{
                    display: "inline-block",
                    animation: "typingDots 1s infinite",
                    animationDelay: `${i * 0.2}s`,
                  }}
                ></span>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex p-4 gap-2 border-t">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
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
