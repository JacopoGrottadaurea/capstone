import React, { useState, useEffect } from 'react';
import MyNavBar from '../components/navbar';
import FavoriteBar from '../components/sidebar';
import { useSession } from '../middleware/ProtectedRoutes';
import MyGameCarousel from '../components/gamecarousel';

function GamesPage() {
  const [userFavorites, setUserFavorites] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const session = useSession();

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

    const fetchFavorites = async () => {
      try {
        // Invia una richiesta al server per ottenere l'array dei preferiti dell'utente
        const userId = session.userId;
        const response = await fetch(`http://localhost:5020/users/${userId}/favorites`);
        const data = await response.json();

        // Memorizza l'array dei preferiti nello stato del componente
        setUserFavorites(data.favorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
    fetchFavorites();
  }, []);

  const handleAddToFavorites = (gameId) => {
    setUserFavorites(favorites => [...favorites, gameId]);
  };

  const handleRemoveFromFavorites = async (gameId) => {
    try {
      // Invia una richiesta al server per rimuovere il gioco dai preferiti dell'utente
      const userId = session.userId;
      await fetch(`http://localhost:5020/users/${userId}/favorites/${gameId}`, { method: 'DELETE' });

      // Aggiorna l'elenco dei giochi preferiti
      setUserFavorites(favorites => favorites.filter(id => id !== gameId));
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <MyNavBar />
      <div>
        <MyGameCarousel
          games={games}
          userFavorites={userFavorites}
          handleAddToFavorites={handleAddToFavorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      </div>
      <FavoriteBar
        games={games}
        userFavorites={userFavorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
        setGames={setGames}
      />
    </>
  );
}

export default GamesPage;