import React, { useState, useEffect, useMemo } from 'react';
import MyCard from '../components/card';
import MyNavBar from '../components/navbar';
import FavoriteBar from '../components/sidebar';
import { useSession } from '../middleware/ProtectedRoutes';

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

  const sortedCards = useMemo(() => {
    if (games) {
      return [...games].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [];
    }
  }, [games]);

  return (
    <>
      <MyNavBar />
      <div>
        <ul className='gamelist'>
          {sortedCards.map(game => (
            <li key={game._id}>
              <MyCard
                game={game}
                userFavorites={userFavorites}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
              />
            </li>
          ))}
        </ul>
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



/* function onRemoveFromFavorites(game) {
  const token = localStorage.getItem('token');
  fetch(`/games/${game._id}/unfavorite`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // Aggiorna lo stato del frontend per riflettere le modifiche ai preferiti
  })
  .catch(error => {
    console.error(error);
  });
}

function onAddToFavorites(game) {
  const token = localStorage.getItem('token');
  fetch(`/games/${game._id}/favorite`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // Aggiorna lo stato del frontend per riflettere le modifiche ai preferiti
  })
  .catch(error => {
    console.error(error);
  });
}*/
