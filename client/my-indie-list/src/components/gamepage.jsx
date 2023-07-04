import React, { useState, useEffect, useMemo } from 'react';
import MyCard from './card';

function GamesPage({ onAddToFavorites, onRemoveFromFavorites }) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Invia una richiesta al server per ottenere tutti i giochi
        const response = await fetch(`http://localhost:5020/games`);
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  const sortedCards = useMemo(() => {
    return [...games].sort((a, b) => a.title.localeCompare(b.title));
  }, [games]);

  return (
    <div>
      <ul className='gamelist'>
        {sortedCards.map(game => (
          <li key={game._id}>
            <MyCard
              game={game}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GamesPage;
