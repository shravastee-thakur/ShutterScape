import ImageModel from "../Models/imageModel.js";
import {
  validateFile,
  uploadToCloudinary,
  cleanupFile,
} from "../utils/imageUtils.js";

// Helper function for error responses
const errorResponse = (res, status, message, error) => {
  console.error(message, error);
  return res.status(status).json({
    success: false,
    message,
    error: error.message,
  });
};

// Upload image
export const uploadImage = async (req, res) => {
  let filePath = req.file?.path;

  try {
    // Validate file
    validateFile(req.file);

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(filePath);

    // Save to database
    const newImage = await ImageModel.create({
      imageURL: cloudinaryResponse.secure_url,
      originalName: req.file.originalname,
      user: req.user?._id,
      cloudinaryPublicId: cloudinaryResponse.public_id,
    });

    // Cleanup
    cleanupFile(filePath);

    // Success response
    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: {
        id: newImage._id,
        url: cloudinaryResponse.secure_url,
        originalName: req.file.originalname,
      },
    });
  } catch (error) {
    cleanupFile(filePath);
    return errorResponse(res, 500, "Image upload failed", error);
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

// Delete image
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
