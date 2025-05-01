// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },

//   filename: function (req, file, cb) {
//     const uniqueName = uuidv4() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// // const upload = multer({ storage });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Example: Limit file size to 10MB
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new Error("File type is not supported"), false); // Only accept image files
//     }
//     cb(null, true);
//   },
// });

// export default upload;
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Ensure uploads folder is created in the root of your project
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName); // Give the file a unique name
  },
});

// Set file size limit and filter for images
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Example: limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("File type is not supported"), false); // Only accept image files
    }
    cb(null, true);
  },
});

export default upload;
