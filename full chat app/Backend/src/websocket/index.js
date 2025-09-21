// import { Server } from "socket.io";
// import { saveMessage } from "../controllers/messageController.js";
// import { updateUnreadMessage } from "../controllers/userController.js";

// function setupSocketIO(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

//   const userSocketMap = new Map();

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     io.emit("onlineUser", Array.from(userSocketMap.keys()));

//     socket.on("register", (userId) => {
//       userSocketMap.set(userId, socket.id);
//       console.log(`User ${userId} registered with socket ${socket.id}`);
//     });

//     socket.on("private-message", async ({ senderId, receiverId, text }) => {
//       const message = await saveMessage({ senderId, receiverId, text });
//       //  update unreadCount
//       await updateUnreadMessage(senderId, receiverId);

//       const receiverSocketId = userSocketMap.get(receiverId);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("private-message", message);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("Connection Closed:", socket.id);
//       for (let [userId, sId] of userSocketMap.entries()) {
//         if (sId === socket.id) {
//           userSocketMap.delete(userId);
//           break;
//         }
//       }
//     });
//   });
// }

// export default setupSocketIO;

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

  // Use Map to store arrays of socket IDs for each user (to support multiple tabs)
  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      // Add socket ID to user's array of sockets
      if (!userSocketMap.has(userId)) {
        userSocketMap.set(userId, []);
      }
      userSocketMap.get(userId).push(socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);

      // Broadcast updated online users list to all clients
      io.emit("onlineUser", Array.from(userSocketMap.keys()));
    });

    socket.on("private-message", async ({ senderId, receiverId, text }) => {
      const message = await saveMessage({ senderId, receiverId, text });
      //  update unreadCount
      await updateUnreadMessage(senderId, receiverId);

      const receiverSocketIds = userSocketMap.get(receiverId);
      if (receiverSocketIds && receiverSocketIds.length > 0) {
        // Send message to all sockets/tabs of the receiver
        receiverSocketIds.forEach((socketId) => {
          io.to(socketId).emit("private-message", message);
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Connection Closed:", socket.id);

      // Find and remove the disconnected socket from user's socket array
      for (let [userId, socketIds] of userSocketMap.entries()) {
        const socketIndex = socketIds.indexOf(socket.id);
        if (socketIndex !== -1) {
          socketIds.splice(socketIndex, 1);
          console.log(`Removed socket ${socket.id} from user ${userId}`);

          // If user has no more active sockets, remove them from online users
          if (socketIds.length === 0) {
            userSocketMap.delete(userId);
            console.log(`User ${userId} went offline (no active sockets)`);
          }

          // Broadcast updated online users list to all clients
          io.emit("onlineUser", Array.from(userSocketMap.keys()));
          break;
        }
      }
    });
  });
}

export default setupSocketIO;
