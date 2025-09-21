import { io } from "socket.io-client";

export const initSocket = (userId) => {
  console.log("Initializing socket for user:", userId);
  
  // Create a new socket connection for each call
  const socket = io("http://localhost:8000", {
    transports: ['websocket'],
    upgrade: false,
    forceNew: true // This ensures each tab gets its own connection
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id, "for user:", userId);
    socket.emit("register", userId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  return socket;
};

export const getSocket = () => {
  console.warn("getSocket is deprecated. Use the socket returned from initSocket instead.");
  return null;
};

export const disconnectSocket = (socketInstance) => {
  if (socketInstance) {
    console.log("Disconnecting socket:", socketInstance.id);
    socketInstance.disconnect();
  }
};
