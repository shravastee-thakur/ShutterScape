import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import { rateLimit } from "express-rate-limit";
import userRoute from "./Routes/userRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import imageRoute from "./Routes/imageRoute.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   standardHeaders: "draft-8",
//   legacyHeaders: false,
// });
// app.use(limiter);

//Routes
app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/user/register

app.use("/api/v1/admin", adminRoute);
// http://localhost:8000/api/v1/admin/get-user

app.use("/api/v1/image", imageRoute);
// http://localhost:8000/api/v1/image/upload-image

export default app;
