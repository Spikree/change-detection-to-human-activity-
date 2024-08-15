import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [oldImage, setOldImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [btnTest, setBtnText] = useState("Submit");
  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnText("Uploading...");
    const formData = new FormData();
    formData.append("image1", oldImage);
    formData.append("image2", newImage);

    try {
      const res = await axios.post(
        "https://change-detection-due-to-human-activities.onrender.com/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(res.data);
      setBtnText("completed");
      console.log(res.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image 1:</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, setOldImage)}
          />
        </div>
        <div>
          <label>Image 2:</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, setNewImage)}
          />
        </div>
        <button type="submit">{btnTest}</button>
      </form>
      {response && (
        <div>
          <h2>OutPut</h2>
          <img src={response?.image1_url} alt="" />
          <br />
          <img src={response?.image2_url} alt="" />
          <br />
          <img src={response.change_map_url} alt="" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
