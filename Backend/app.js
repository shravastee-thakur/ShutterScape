import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);
//http://localhost:5000/api/v1/auth/register

app.use("/api/v1/user", userRoutes);
//http://localhost:5000/api/v1/user/me

app.use(errorHandler);

export default app;
