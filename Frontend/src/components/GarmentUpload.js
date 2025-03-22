import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GarmentUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      navigate('/gender', { 
        state: { 
          image: selectedImage,
          category: category 
        } 
      });
    } else {
      setUploadStatus('Please select an image first');
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#61dafb', marginBottom: '1rem' }}>
        Upload {category} Image
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
          onChange={handleImageUpload}
          style={{ marginBottom: '1rem' }}
        />
        
        {selectedImage && (
          <div>
            <img 
              src={selectedImage} 
              alt="Selected garment" 
              style={{ 
                maxWidth: '300px', 
                marginTop: '1rem',
                borderRadius: '5px'
              }} 
            />
          </div>
        )}

        <button 
          onClick={handleConfirm}
          className="button-style"
          style={{ marginTop: '1rem' }}
        >
          Confirm & Continue
        </button>

        {uploadStatus && (
          <p style={{ color: '#ff6b6b', marginTop: '1rem' }}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default GarmentUpload;