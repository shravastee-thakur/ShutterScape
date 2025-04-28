import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    const checkToken = localStorage.getItem("token");
    if (!checkToken) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("image", e.target.files[0]); // Append the file to the FormData

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/image/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`, // Include token here
          },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4">
      <label>
        <AddCircleIcon sx={{ fontSize: 40, color: "#15803d" }} />
        <input
          onChange={handleChange}
          style={{ display: "none" }}
          type="file"
        />
      </label>
    </div>
  );
};

export default Button;
