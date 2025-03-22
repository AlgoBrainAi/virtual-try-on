import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../config';

function Subcategories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, gender, garments, image } = location.state || {};

  useEffect(() => {
    // Redirect to home if any required state is missing
    if (!category || !gender || !garments || !image) {
      navigate('/');
    }
  }, [category, gender, garments, image, navigate]);
  const [tryOnResult, setTryOnResult] = useState(null);

  const handleTryOn = async (garmentUrl) => {
    try {
      const response = await fetch(`${API_URL}/try-on`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          garmentPath: `garments/${gender.toLowerCase()}/${category}/${garmentUrl.split('/').pop()}`,
          userImagePath: image
        }),
      });
      
      if (!response.ok) {
        throw new Error('Try-on request failed');
      }

      const data = await response.json();
      console.log('Response data:', data);

      // Assuming the backend returns paths to the images
      setTryOnResult({
        userImage: `${API_URL}/${data.userImage}`, // Adjust path based on your backend response
        resultImage: `${API_URL}/${data.resultImage}` // Adjust path based on your backend response
      });
      
    } catch (error) {
      console.error('Error during try-on:', error);
    }
  };

  const handleContinue = () => {
    if (!tryOnResult) return;

    const otherCategory = category === 'Upper-body' ? 'Lower-body' : 
                        category === 'Lower-body' ? 'Upper-body' : null;
    
    if (otherCategory) {
      const otherGarments = [
        { id: '1', url: `/garments/${gender.toLowerCase()}/${otherCategory}/0.jpg` },
      ];
      
      // Extract just the filename from the resultImage URL
      const resultImagePath = tryOnResult.resultImage.split('/static/')[1];
      
      navigate('/subcategories', {
        state: {
          category: otherCategory,
          gender,
          garments: otherGarments,
          image: `/static/${resultImagePath}` // Pass relative path
        }
      });
    } else {
      navigate('/try-on-result', { state: { tryOnResult } });
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#61dafb', marginBottom: '2rem' }}>
        {gender} - {category}
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        width: '100%',
        padding: '1rem'
      }}>
        {garments.map((garment) => (
          <div 
            key={garment.id}
            style={{
              background: '#282c34',
              padding: '1rem',
              borderRadius: '8px'
            }}
          >
            <img 
              src={garment.url}
              alt={garment.id}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
                marginBottom: '1rem'
              }}
            />
            <button 
              onClick={() => handleTryOn(garment.url)}
              className="button-style"
              style={{ width: '100%' }}
            >
              Try On
            </button>
          </div>
        ))}
      </div>

      {tryOnResult && (
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: '#282c34',
          borderRadius: '10px'
        }}>
          <h2 style={{ color: '#61dafb', marginBottom: '1rem' }}>Try-On Result</h2>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <div>
                <h3 style={{ color: '#61dafb' }}>Your Image</h3>
                <img 
                  src={tryOnResult.userImage} 
                  alt="User"
                  style={{ maxWidth: '300px', borderRadius: '5px' }}
                />
              </div>
              <div>
                <h3 style={{ color: '#61dafb' }}>Result</h3>
                <img 
                  src={tryOnResult.resultImage} 
                  alt="Result"
                  style={{ maxWidth: '300px', borderRadius: '5px' }}
                />
              </div>
            </div>
            
            {category !== 'Dress' && (
              <button
                onClick={handleContinue}
                className="button-style"
                style={{ marginTop: '1rem', minWidth: '200px' }}
              >
                Try on {category === 'Upper-body' ? 'Lower-body' : 'Upper-body'}
              </button>
            )}
            
            <button
              onClick={() => navigate('/try-on-result', { state: { tryOnResult } })}
              className="button-style"
              style={{ marginTop: '1rem', minWidth: '200px' }}
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subcategories;