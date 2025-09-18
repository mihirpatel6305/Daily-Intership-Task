import { Server } from "socket.io";
import { saveMessage } from "../controllers/messageController.js";
import { updateUnreadMessage } from "../controllers/userController.js";

function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    io.emit("onlineUser", Array.from(userSocketMap.keys()));

    socket.on("register", (userId) => {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("private-message", async ({ senderId, receiverId, text }) => {
      const message = await saveMessage({ senderId, receiverId, text });
      //  update unreadCount
      await updateUnreadMessage(senderId, receiverId);

      const receiverSocketId = userSocketMap.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private-message", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Connection Closed:", socket.id);
      for (let [userId, sId] of userSocketMap.entries()) {
        if (sId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
    });
  });
}

export default setupSocketIO;
