import React, { useState, useEffect } from 'react';
import DarkCard from './card';
import Sidebar from './sidebar';

const ParentComponent = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5020/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  const handleAddToFavorites = async (game) => {
    try {
      const response = await fetch(`http://localhost:5020/games/${game._id}/favorite`, { method: 'PUT' });
      if (response.ok) {
        // Aggiorna lo stato dei giochi per riflettere le modifiche
        setGames((prevGames) =>
          prevGames.map((g) => (g._id === game._id ? { ...g, isFavorite: true } : g))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromFavorites = async (game) => {
    try {
      const response = await fetch(`http://localhost:5020/games/${game._id}/unfavorite`, { method: 'PUT' });
      if (response.ok) {
        // Aggiorna lo stato dei giochi per riflettere le modifiche
        setGames((prevGames) =>
          prevGames.map((g) => (g._id === game._id ? { ...g, isFavorite: false } : g))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DarkCard games={games} onAddToFavorites={handleAddToFavorites} onRemoveFromFavorites={handleRemoveFromFavorites} />
      <Sidebar games={games} onRemoveFromFavorites={handleRemoveFromFavorites} />
    </>
  );
};

export default ParentComponent;
