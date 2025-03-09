import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

import connectDB from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoute.js";
import adminRoutes from "./Routes/adminRoute.js";

connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
// http://localhost:8000/api/v1/user/signup
app.use("/api/v1/admin", adminRoutes);
// http://localhost:8000/api/v1/admin/getUser

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
