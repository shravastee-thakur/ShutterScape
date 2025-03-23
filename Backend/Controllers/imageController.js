import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import ImageModel from "../Models/imageModel.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path; //Path of uploaded file
    const originalName = req.file.originalname;

    // upload to cloudinary

    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    // Store Image URL & Original Name in MongoDB
    const newImage = new ImageModel({
      ImageURL: cloudinaryResponse.secure_url,
      originalName: originalName,
    });

    await newImage.save();

    // Delete file from upload
    fs.unlinkSync(filePath, (err) => {
      if (err) console.error("Error in deleting file", err);
      else console.log("Temporary file deleted:", filePath);
    });

    res.json({
      message: "File uploaded successfully",
      url: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};

export const getImages = async (req, res) => {
  try {
    // New file will apper 1st
    const images = await ImageModel.find().sort({ createdAt: -1 });

    res.json({
      message: "Stored images retrieved successfully",
      total: images.length,
      images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
