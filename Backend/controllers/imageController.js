import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import ImageModel from "../models/imageModel.js";
dotenv.config();

if (
  !process.env.CLOUDINARY_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Cloudinary configuration is missing!");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const uploadImage = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalName;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(req.file.mimetype)) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message:
          "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.",
      });
    }

    if (req.file.size > MAX_FILE_SIZE) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: "ShutterScape",
    });

    const newImage = new ImageModel({
      imageURL: cloudinaryResponse.secure_url,
      originalName: originalName,
      user: req.user?._id,
      cloudinaryPublicId: cloudinaryResponse.public_id,
    });

    await newImage.save();

    try {
      fs.unlinkSync(filePath);
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError);
    }

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: {
        id: newImage._id,
        url: cloudinaryResponse.secure_url,
        originalName: originalName,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    // Clean up: delete the temporary file if something went wrong
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error cleaning up temporary file:", unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await ImageModel.find().sort({ createdAt: -1 });

    res.json({
      message: "Stored images retrieved successfully",
      total: images.length,
      images,
    });
  } catch (error) {
    console.error("Get Images Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve images",
      error: error.message,
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryPublicId);

    // Delete from database
    await ImageModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete Image Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};
