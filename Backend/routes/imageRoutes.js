import express from "express";
import upload from "../middleware/multerMiddleware.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  deleteImage,
  getImages,
  uploadImage,
} from "../controllers/imageController.js";

const router = express.Router();

// router.post("/uploadImage", verifyUser, upload.single("image"), uploadImage);
router.post(
  "/uploadImage",
  verifyUser,
  (req, res, next) => {
    console.log("Request Headers: ", req.headers);
    console.log("Request Body: ", req.body);
    console.log("Request File: ", req.file);
    next(); // This will call the next middleware (upload.single or controller function)
  },
  upload.single("image"),
  uploadImage
);

router.get("/getImages", getImages);
router.delete("/deleteImage/:id", deleteImage);
export default router;
