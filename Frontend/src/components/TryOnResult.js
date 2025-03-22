import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TryOnResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tryOnResult } = location.state || {};

  if (!tryOnResult) {
    return navigate('/');
  }

  return (
    <div className="page-container">
      <h1 style={{ 
        color: '#61dafb', 
        fontSize: '2.5rem',
        textAlign: 'center',
        marginTop: '3rem',
        animation: 'fadeIn 1s ease-in'
      }}>
        Thank You for Using Our Service!
      </h1>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default TryOnResult;