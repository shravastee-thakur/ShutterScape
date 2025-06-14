import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const ImageUpload = () => {
  const { accessToken } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);

  // Fetch all uploaded images on mount
  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/image/get-image",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setImageList(res.data.allImages);
        }
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    getAllImages();
  }, [accessToken]);

  // Handle image drop/upload
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/image/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        
        // Add the new image to the list
        setImageList((prev) => [...prev, res.data.newImage]);
      }
    } catch (error) {
      console.error("Upload image failed", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 h-full overflow-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Image Gallery App
      </h1>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`mt-4 border-2 border-dashed border-gray-400 rounded-lg p-10 text-center cursor-pointer transition-colors duration-300 ${
          isDragActive ? "border-blue-500 bg-blue-50" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop or click to upload"}
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {imageList.map((image) => (
          <div
            key={image._id || image.imageUrl}
            className="border rounded-md shadow-sm overflow-hidden"
          >
            <img
              src={image.imageUrl}
              alt={image.originalName}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-sm text-center text-gray-700">
              {image.originalName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
