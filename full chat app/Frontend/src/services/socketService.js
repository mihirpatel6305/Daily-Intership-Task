import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io("http://localhost:8000");

  socket.on("connect", () => {
    socket.emit("register", userId);
  });

  return socket;
};
