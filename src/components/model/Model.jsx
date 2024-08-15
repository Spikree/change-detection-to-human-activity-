import React, { useRef, useState } from 'react'
import './Model.css'
import axios from 'axios';

const Model = () => {
    const [oldImage, setOldImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const oldImageRef = useRef();
    const newImageRef = useRef();

    const url = import.meta.env.VITE_BACKEND_URL;

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleOldImageUpload = (e) => {
        e.preventDefault();
        oldImageRef.current.click();
    };

    const handleNewImageUpload = (e) => {
        e.preventDefault();
        newImageRef.current.click();
    };

    const process = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('oldImage', oldImage);
        formData.append('newImage', newImage);

        try {
            const response = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Response:', response.data);   
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <div className='model'>
            <div className="header">
                <p>Upload images you want to detect change for</p>
            </div>

            <div className='model-inner'>

            <div className="image-input">
                <form onSubmit={(e) => process(e)}>
                    <div className="old-image">
                        <label>Image 1 :</label>
                        <input 
                            ref={oldImageRef}
                            type="file" 
                            onChange={(e) => handleImageChange(e, setOldImage)} 
                            style={{display:"none"}}
                            name='image1'
                        />
                        <button onClick={(e) => handleOldImageUpload(e)}>Image 1</button>
                    </div>

                    <div className="new-image">
                        <label>Image 2 :</label>
                        <input 
                        ref={newImageRef}
                            type="file" 
                            onChange={(e) => handleImageChange(e, setNewImage)} 
                            style={{display:"none"}}
                            name='image2'
                        />
                        <button onClick={(e) => handleNewImageUpload(e)}>Image 2</button>
                    </div>

                    <button>Submit</button>
                </form>
            </div>

           

            <div className="image-preview">
                <div className="image-old">
                    <img src={oldImage} alt="" />
                </div>

                <div className="image-new">
                    <img src={newImage} alt="" />
                </div>
            </div>
            </div>

            <div className="changes">
                <h1>Changes detected</h1>
                <img src="" alt="" />
            </div>
        </div>
    );
};

export default Model;
