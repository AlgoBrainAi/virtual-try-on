import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import GenderSelection from './components/GenderSelection';
import Categories from './components/Categories';
import Subcategories from './components/Subcategories';
import TryOnResult from './components/TryOnResult';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<ImageUpload />} />
            <Route path="/gender" element={<GenderSelection />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/subcategories" element={<Subcategories />} />
            <Route path="/try-on-result" element={<TryOnResult />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
