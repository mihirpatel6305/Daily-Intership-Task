import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("This is Home page");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

export default app;
