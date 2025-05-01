import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);

  // Fetch all images
  const fetchImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/image/allImages",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setImages(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="gallery-container min-h-screen p-4 bg-gray-100">
      <h1 className="text-center text-3xl font-bold mb-6">Image Gallery</h1>

      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{image.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No images available.</p>
      )}
    </div>
  );
};

export default Gallery;
