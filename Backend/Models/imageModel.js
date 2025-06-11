import mongoose from "mongoose";

const imageSchama = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchama);
export default Image;
