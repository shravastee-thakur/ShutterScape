import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const ImageUpload = () => {
  const { accessToken } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);

  // Fetch all uploaded images on mount
  useEffect(() => {
    const getUserImages = async () => {
      try {
        const res = await axios.get(
          "https://shutterscape-bktd.onrender.com/api/v1/image/user-image",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setImageList(res.data.userImages);
        }
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    getUserImages();
  }, [accessToken]);

  // Handle image drop/upload
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const res = await axios.post(
        "https://shutterscape-bktd.onrender.com/api/v1/image/upload-image",
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

  const handleSubmit = async (imageId) => {
    const res = await axios.delete(
      `https://shutterscape-bktd.onrender.com/api/v1/image/delete-image/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    if (res.data.success) {
      alert(res.data.message);
      setImageList((prev) => prev.filter((img) => img._id !== imageId));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 h-full">
      <h1 className="text-3xl font-semibold text-center mb-6">Image Gallery</h1>

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
            : "Drag and drop or click to upload, File Size < 2Mb"}
        </p>
      </div>

      {/* Image Grid */}
      {imageList.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No images uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 overflow-y-scroll pb-20">
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
              <div className="p-2 text-sm text-center text-gray-700 flex justify-between">
                {image.originalName}
                <div
                  className="cursor-pointer"
                  onClick={() => handleSubmit(image._id)}
                >
                  <DeleteForeverOutlinedIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
