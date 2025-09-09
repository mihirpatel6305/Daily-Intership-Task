import { useEffect, useRef, useState } from "react";
import getMessageFromNumber from "./utils/getMessageFromNumber";
import InputMessage from "./Components/InputMessage";

function App() {
  const ws = useRef(null);
  const reconnectRef = useRef(null);
  const messagesEndRef = useRef();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  function scrolldown() {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }

  function connectWebsocket() {
    if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
      ws.current.close();
    }

    ws.current = new WebSocket(
      "wss://ws.finnhub.io?token=d2rc4bpr01qlk22slkr0d2rc4bpr01qlk22slkrg"
    );

    ws.current.onopen = () => {
      console.log("Connected to websocket");
      ws.current.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
    };

    ws.current.onclose = () => {
      console.log("Connection closed. Retrying in 3s...");
      if (!reconnectRef.current) {
        reconnectRef.current = setTimeout(() => {
          connectWebsocket();
          reconnectRef.current = null;
        }, 3000);
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const timeStr = data?.data[0]?.t;
      const dummyReceivedMsg = getMessageFromNumber(timeStr);
      timeStr &&
        setMessages((prev) => [
          ...prev,
          { text: dummyReceivedMsg, type: "received" },
        ]);
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }

  useEffect(() => {
    connectWebsocket();

    return () => {
      if (reconnectRef.current) {
        clearTimeout(reconnectRef.current);
      }
      if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    scrolldown();
  }, [messages]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md h-[90vh] bg-white rounded-lg shadow-md flex flex-col">
        <h1 className="text-2xl font-bold p-3 border-b">💬 Chat App</h1>

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
          {/* For scroll to see last message */}
          <div ref={messagesEndRef}></div>
        </div>

        <InputMessage />
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
      </div>
    </div>
  );
}

export default App;
