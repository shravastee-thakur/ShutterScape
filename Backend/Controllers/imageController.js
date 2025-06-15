import Image from "../Models/imageModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({ message: "File size exceeds 2MB" });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ShutterScape",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        // transformation: [{ width: 800, height: 800, crop: "limit" }],
        eager: [
          { width: 800, height: 800, crop: "limit" }, // thumbnail or resized version
        ],
      },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const newImage = await Image.create({
          imageUrl: result.eager[0].secure_url, // resized version
          originalUrl: result.secure_url, // full-size version
          originalName: req.file.originalname,
          publicId: result.public_id,
          user: req.user.id,
          // imageUrl: result.secure_url,
          // originalName: req.file.originalname,
          // publicId: result.public_id,
          // user: req.user.id,
        });

        res.status(201).json({ success: true, newImage });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    next(error);
  }
};

export const getAllImages = async (req, res, next) => {
  try {
    const allImages = await Image.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, allImages, message: "Fetched all images" });
  } catch (error) {
    next(error);
  }
};

export const getUserImages = async (req, res, next) => {
  try {
    const id = req.user.id;
    const userImages = await Image.find({ user: id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, userImages, message: "Fetched all images" });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Convert both to string for consistent comparison
    const imageUserId = image.user.toString();
    const requestingUserId = req.user.id.toString();

    if (imageUserId !== requestingUserId) {
      return res.status(403).json({
        message: "Unauthorized",
        details: {
          imageUserId,
          requestingUserId,
        },
      });
    }

    const result = await cloudinary.uploader.destroy(image.publicId);
    if (result.result !== "ok") {
      return res.status(500).json({ message: "Cloudinary deletion failed" });
    }

    await image.deleteOne();

    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
};
