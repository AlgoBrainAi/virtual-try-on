import { API_URL } from '../config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageUpload() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedImagePath, setUploadedImagePath] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);  // Store the actual file
      setSelectedImage(URL.createObjectURL(file));  // For preview only
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image first');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadedImagePath(data.image_path);
      navigate('/gender', { 
        state: { 
          image: data.image_path,
          userImagePath: data.image_path // Pass the specific image path
        } 
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Failed to upload image');
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#61dafb', marginBottom: '2rem' }}>
        Upload Your Image
      </h1>
      <div style={{ 
        background: '#282c34',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ marginBottom: '1rem' }}
        />
        {selectedImage && (
          <div>
            <img 
              src={selectedImage} 
              alt="Preview" 
              style={{ 
                maxWidth: '300px', 
                marginTop: '1rem',
                borderRadius: '5px'
              }} 
            />
            <button 
              onClick={handleUpload}
              className="button-style"
              style={{ display: 'block', margin: '1rem auto 0' }}
            >
              Upload & Continue
            </button>
          </div>
        )}
        {uploadStatus && (
          <p style={{ color: '#ff6b6b', marginTop: '1rem' }}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;