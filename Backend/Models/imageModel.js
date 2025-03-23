import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    ImageURL: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model("Image", imageSchema);
export default ImageModel;
