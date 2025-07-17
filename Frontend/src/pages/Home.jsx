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
          "https://shutterscape-bktd.onrender.com/api/v1/image/get-image"
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
    <div className="px-10 md:px-20 lg:px-32 my-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8 overflow-y-scroll">
        {images.map((image) => (
          <div
            key={image._id || image.imageUrl}
            className="border rounded-md shadow-sm overflow-hidden"
          >
            <img
              src={image.imageUrl}
              alt={image.originalName}
              // onClick={() => openModal(image.originalUrl)}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
