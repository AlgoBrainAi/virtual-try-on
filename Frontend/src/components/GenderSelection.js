import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GenderSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {};

  useEffect(() => {
    // Redirect to home if no image in state (e.g., on refresh)
    if (!image) {
      navigate('/');
    }
  }, [image, navigate]);

  const handleGenderSelect = (gender) => {
    navigate('/categories', { 
      state: { 
        gender,
        image  // Pass the image path forward
      } 
    });
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#61dafb', marginBottom: '2rem' }}>
        Select Gender
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '200px'
      }}>
        <button 
          onClick={() => handleGenderSelect('Male')}
          className="button-style"
        >
          Male
        </button>
        <button 
          onClick={() => handleGenderSelect('Female')}
          className="button-style"
        >
          Female
        </button>
      </div>
    </div>
  );
}

export default GenderSelection;