import express from "express";
import { getAllUser, getLoginUser } from "../controllers/userController.js";
import { ProtectedRoutes } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/allUser", ProtectedRoutes, getAllUser);

routes.get("/me", ProtectedRoutes, getLoginUser);

export default routes;
