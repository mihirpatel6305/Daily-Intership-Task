import { useQueryClient } from "@tanstack/react-query";
import handleReadAll from "../utils/handleReadAll";

function Header() {
  const queryClient = useQueryClient();
  const messages = queryClient.getQueryData(["messages"]) || [];
  const unreadCount = messages.filter((msg) => !msg.read).length;

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">💬 Chat App</h1>

      <div className="flex items-center space-x-3">
        <button className="relative p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition">
          🔔
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        </button>

        <button
          onClick={() => handleReadAll(queryClient)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Mark All Read
        </button>
      </div>
    </div>
  );
}

export default Header;
