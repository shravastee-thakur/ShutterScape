import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoute from "./Routes/userRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import imageRoute from "./Routes/imageRoute.js";

const app = express();

// ========== CRITICAL RENDER OPTIMIZATIONS ==========
// Ultra-lightweight health check
app.get("/api/ping", (req, res) => {
  res.set({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache',
    'Connection': 'keep-alive'
  });
  res.status(200).end('{"status":"alive","timestamp":' + Date.now() + '}');
});

// Root endpoint
app.get("/", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).send("ShutterScape backend is running");
});

// Middlewares
app.use(
  cors({
    origin: "https://shra-shutterscape.netlify.app",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(helmet());

//Routes
app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/user/register

app.use("/api/v1/admin", adminRoute);
// http://localhost:8000/api/v1/admin/get-user

app.use("/api/v1/image", imageRoute);
// http://localhost:8000/api/v1/image/upload-image


// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Not Found",
    availableEndpoints: [
      "/api/v1/user",
      "/api/v1/admin",
      "/api/v1/image",
      "/api/ping"
    ]
  });
});

export default app;
