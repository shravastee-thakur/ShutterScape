import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { accessToken } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/image/get-image"
        );

        if (res.data.success) {
          setImages(res.data.allImages);
        }
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };
    getAllImages();
  }, []);
  return (
    <div className="px-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-8 overflow-y-scroll">
      {images.map((image) => (
        <div
          key={image._id || image.imageUrl}
          className="border rounded-md shadow-sm overflow-hidden"
        >
          <img
            src={image.imageUrl}
            alt={image.originalName}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Home;
