import express from "express";
import multer from "multer";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  uploadImage,
  getAllImages,
  getUserImages,
  deleteImage,
} from "../Controllers/imageController.js";

const router = express.Router();
const upload = multer();

router.get("/get-image", getAllImages);

router.post("/upload-image", authenticate, upload.single("image"), uploadImage);
router.get("/user-image", authenticate, getUserImages);
router.delete("/:id", authenticate, deleteImage);

export default router;
