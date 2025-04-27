import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
