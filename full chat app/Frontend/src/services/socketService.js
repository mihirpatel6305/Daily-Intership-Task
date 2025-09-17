import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io("http://localhost:8000");

  socket.on("connect", () => {
    socket.emit("register", userId);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.error("Socket not initialized. Call initSocket first!");
  }
  return socket;
};
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
