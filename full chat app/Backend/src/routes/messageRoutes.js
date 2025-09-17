import express from "express";
import { ProtectedRoutes } from "../middleware/auth.js";
import {
  getChatMessage,
  sendMessage,
} from "../controllers/messageController.js";

const routes = express.Router();

routes.post("/sendMessage/:id", ProtectedRoutes, sendMessage);
routes.get("/getMessage/:id", ProtectedRoutes, getChatMessage);

export default routes;
