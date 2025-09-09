import { useEffect, useRef } from "react";

function MessageList({ messages }) {
  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {messages.map((msgObj, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg max-w-[75%] ${
            msgObj.type === "sent"
              ? "bg-indigo-50 text-gray-900 self-end ml-auto"
              : "bg-gray-200 text-gray-800 self-start mr-auto"
          }`}
        >
          {msgObj.type === "sent" ? "You: " : "Server: "}
          {msgObj.text}
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default MessageList;
