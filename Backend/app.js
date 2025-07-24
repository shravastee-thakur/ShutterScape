import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoute from "./Routes/userRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import imageRoute from "./Routes/imageRoute.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("ShutterScape backend is running");
});

app.get("/api/ping", (req, res) => {
  res.json({ status: "alive" });
});

// Middlewares
app.use(
  cors({
    origin: "https://shra-shutterscape.netlify.app",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

//Routes
app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/user/register

app.use("/api/v1/admin", adminRoute);
// http://localhost:8000/api/v1/admin/get-user

app.use("/api/v1/image", imageRoute);
// http://localhost:8000/api/v1/image/upload-image

export default app;
