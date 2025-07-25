import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const PORT = process.env.PORT || 3000;

// Render-optimized server start
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Health check: http://0.0.0.0:${PORT}/api/ping`);
});

// Keepalive for Render's free tier
setInterval(() => {
  server.getConnections((err, count) => {
    console.log(`[${new Date().toISOString()}] Active connections: ${count}`);
  });
}, 30000); // 25 seconds (under Render's 30s threshold)

// Handle shutdown gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
});
