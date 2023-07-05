import React, { useState } from 'react';
import MyCard from './card';
import SearchBar from './searchbar';
import '../style/searchpage.css';

function SearchPage({ onAddToFavorites, onRemoveFromFavorites, setGames }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleAddToFavorites = (game) => {
    setGames((prevGames) =>
      prevGames.map((g) => (g.title === game.title ? { ...g, isFavorite: true } : g))
    );
  };

  return (
    <div>
      <SearchBar onAddToFavorites={onAddToFavorites} onRemoveFromFavorites={onRemoveFromFavorites} setGames={setGames} />
      <MyCard selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
    </div>
  );
}

export default SearchPage;
