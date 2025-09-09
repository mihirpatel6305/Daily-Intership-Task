import { useState } from "react";
import MessageList from "./Components/MessageList";
import ChatInput from "./Components/ChatInput";
import useWebSocket from "./hooks/useWebSocket";

function App() {
  const { messages, sendMessage } = useWebSocket();
  const [message, setMessage] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md h-[90vh] bg-white rounded-lg shadow-md flex flex-col">
        <h1 className="text-2xl font-bold p-3 border-b">💬 Chat App</h1>

        <MessageList messages={messages} />
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
