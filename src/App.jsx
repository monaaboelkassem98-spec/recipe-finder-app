import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';

function App() {
  // LocalStorage initialization for Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipe_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === recipe.id);
      if (exists) {
        return prev.filter((item) => item.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  return (
    <Router>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <AppNavbar favoritesCount={favorites.length} />
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
            />
            <Route
              path="/recipe/:id"
              element={<RecipeDetails favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
            />
            <Route
              path="/favorites"
              element={<Favorites favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;