import express from "express";
import { ProtectedRoutes } from "../middleware/auth.js";
import {
  getChatMessage,
  getUnreadCount,
  sendMessage,
} from "../controllers/messageController.js";

const routes = express.Router();

routes.post("/sendMessage/:id", ProtectedRoutes, sendMessage);
routes.get("/:id", ProtectedRoutes, getChatMessage);

routes.get("/unreadCount/:id", ProtectedRoutes, getUnreadCount);

export default routes;
