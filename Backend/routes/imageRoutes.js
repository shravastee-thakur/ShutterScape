import express from "express";
import upload from "../middleware/multerMiddleware.js";
import {
  deleteImage,
  getImages,
  uploadImage,
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/uploadImage", upload.array("image", 4), uploadImage);
router.get("/getImages", getImages);
router.delete("/deleteImage/:id", deleteImage);
export default router;
