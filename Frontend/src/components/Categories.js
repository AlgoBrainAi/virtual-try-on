import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { gender, image } = location.state || {};

  useEffect(() => {
    // Redirect to home if no gender or image in state
    if (!gender || !image) {
      navigate('/');
    }
  }, [gender, image, navigate]);

  const categories = [
    "Upper-body",
    "Lower-body",
    "Dress"
  ];

  const handleCategorySelect = (category) => {
    // Create garments array with direct paths to public folder
    const garments = [
      { id: '1', url: `/garments/${gender.toLowerCase()}/${category}/0.jpg` },
    //   { id: '2', url: `/garments/${gender.toLowerCase()}/${category}/4.jpg` },
    //   { id: '3', url: `/garments/${gender.toLowerCase()}/${category}/10.jpg` }
      // Add more garments as needed
    ];

    navigate('/subcategories', { 
      state: { 
        category,
        gender,
        garments,
        image  // Added image to be passed forward
      }
    });
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#61dafb', marginBottom: '2rem' }}>Select Category</h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '200px'
      }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className="button-style"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;