import express from "express";
import {
  getAllUser,
  getLoginUser,
  resetUnreadMessage,
} from "../controllers/userController.js";
import { ProtectedRoutes } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/allUser", ProtectedRoutes, getAllUser);

routes.get("/me", ProtectedRoutes, getLoginUser);

routes.get("/resetUnreadMessage/:id", ProtectedRoutes, resetUnreadMessage);

export default routes;
