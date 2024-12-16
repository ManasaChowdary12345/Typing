import React from 'react'
import TypingGame from './Typing_proj/TypingGame'
import Website from './Typing_proj/Website'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<Website />} />
        
        {/* Route for the typing game */}
        <Route path="/game" element={<TypingGame />} />
      </Routes>
    </Router>
  );
};


export default App