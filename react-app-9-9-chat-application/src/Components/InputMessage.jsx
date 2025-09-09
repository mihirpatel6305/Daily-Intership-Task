import { useState } from "react";

function InputMessage() {
  const [message, setMessage] = useState("");

  function sendMessage(msg) {
    if (msg.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
      setMessages((prev) => [...prev, { text: msg, type: "sent" }]);
      setMessage("");
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }
  return (
    <div className="flex p-3 gap-2 border-t">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && sendMessage(message)}
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type a message..."
      />
      <button
        onClick={() => sendMessage(message)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
}

export default InputMessage;
