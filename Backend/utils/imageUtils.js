import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Configuration
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Validate uploaded file
export const validateFile = (file) => {
  if (!file) throw new Error("No file uploaded");
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 5MB limit");
  }
};

// Upload to Cloudinary
export const uploadToCloudinary = async (filePath, folder = "ShutterScape") => {
  return await cloudinary.uploader.upload(filePath, { folder });
};

// Clean up temporary file
export const cleanupFile = (filePath) => {
  try {
    if (filePath) fs.unlinkSync(filePath);
  } catch (error) {
    console.error("File cleanup error:", error);
  }
};
