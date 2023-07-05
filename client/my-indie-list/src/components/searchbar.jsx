import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './card';

function SearchBar(onAddToFavorites, onRemoveFromFavorites) {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // Invia una richiesta al server per cercare i giochi
      const response = await fetch(`http://localhost:5020/search?q=${query}`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="search-input"
          placeholder="Cerca giochi..."
        />
        <button onClick={handleSearch} className="search-button">Cerca</button>
      </div>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            <Card
              game={game}
              onClick={() => handleCardClick(game._id)}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
              setGames={setGames}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
