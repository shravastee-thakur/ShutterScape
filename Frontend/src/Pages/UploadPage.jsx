import { useEffect, useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [preview, setPreview] = useState("");

  // Fetch user's previously uploaded images
  const fetchUserImages = async () => {
    try {
      const res = await axios.get("/api/v1/image/user", {
        withCredentials: true,
      });
      setUserImages(res.data.images);
    } catch (error) {
      console.error("Error fetching user images:", error);
    }
  };

  useEffect(() => {
    fetchUserImages();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("/api/v1/image/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSelectedFile(null);
      setPreview("");
      fetchUserImages(); // Refresh images after upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>

      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-4 border p-6 rounded-lg shadow-md"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />

        {preview && (
          <div className="w-48 h-48 overflow-hidden rounded-lg shadow">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={!selectedFile}
        >
          Upload
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Your Uploaded Images</h3>

        {userImages.length === 0 ? (
          <p className="text-gray-600">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userImages.map((image) => (
              <div key={image._id} className="rounded overflow-hidden shadow">
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
