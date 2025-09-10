import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

function MessageList() {
  const messagesEndRef = useRef();
  const queryClient = useQueryClient();
  const messages = queryClient.getQueryData(["messages"]) || [];

  const stopIndex = messages.findIndex((msg) => msg.read === false);
  const readMessages =
    stopIndex === -1 ? messages : messages.slice(0, stopIndex);
  const unreadMessages = stopIndex === -1 ? [] : messages.slice(stopIndex);

  const lastMessage = messages[messages.length - 1];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (lastMessage?.type === "sent") {
      scrollToBottom();
    }
  }, [lastMessage]);

  return (
    <div className="relative flex-1 bg-gray-50 overflow-y-auto p-3 space-y-2 scrollbar-hide">
      {readMessages.map((msgObj, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg max-w-[75%] break-words ${
            msgObj.type === "sent"
              ? "bg-blue-50 text-gray-900 self-end ml-auto"
              : "bg-gray-200 text-gray-800 self-start mr-auto"
          }`}
        >
          {msgObj.type === "sent" ? "You: " : "Server: "} {msgObj.text}
        </div>
      ))}

      {unreadMessages.length > 0 && (
        <div className="my-2 text-center text-sm text-gray-500 flex items-center">
          <div className="flex-1 border-t border-gray-400"></div>
          <span className="mx-2 font-medium">Unread messages</span>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>
      )}

      {unreadMessages.map((msgObj, index) => (
        <div
          key={index + stopIndex}
          className={`p-2 rounded-lg max-w-[75%] break-words font-medium ${
            msgObj.type === "sent"
              ? "bg-blue-100 text-gray-900 self-end ml-auto"
              : "bg-gray-300 text-gray-800 self-start mr-auto"
          }`}
        >
          {msgObj.type === "sent" ? "You: " : "Server: "} {msgObj.text}
        </div>
      ))}

      <div ref={messagesEndRef}></div>

      <button
        onClick={scrollToBottom}
        className="fixed bottom-30 right-[37vw] p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition z-50"
      >
        ⮟
      </button>
    </div>
  );
}

export default MessageList;
