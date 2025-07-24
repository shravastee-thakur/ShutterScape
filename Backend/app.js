import express from "express";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoute from "./Routes/userRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import imageRoute from "./Routes/imageRoute.js";

const app = express();

const url = `https://shutterscape-bktd.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

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
