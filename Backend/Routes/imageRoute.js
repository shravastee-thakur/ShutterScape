import express from "express";
import { getImages, uploadImage } from "../Controllers/imageController.js";
import upload from "../Middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/getImage", getImages);

export default router;
