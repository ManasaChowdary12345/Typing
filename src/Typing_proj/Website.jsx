import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './Website.css';

const Website = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleStartClick = () => {
    navigate('/game'); // Navigate to /game route
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Challenge Yourself with Typing!</h1>
        <div className="btn">
          <button onClick={handleStartClick}>Let's Roll</button>
        </div>
      </div>
    </div>
  );
};

export default Website;
