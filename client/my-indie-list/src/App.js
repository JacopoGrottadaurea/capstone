import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import DarkNavbar from './components/navbar';
import MyCard from './components/card';
import WelcomePage from './components/welcome';
import Footer from './components/footer';
import Loader from './components/loader';
import myLoader from './assets/loader.gif';
import Sidebar from './components/sidebar';
import GameDetails from './components/gamedetail';
import Login from './components/login'
import SignIn from './components/signin'
import AddGameForm from './components/gameform';
import FavoritesList from './components/favoritelist';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5020/games'); // Assicurati che l'URL corrisponda all'URL del server in esecuzione
        if (!response.ok) {
          throw new Error(`Errore durante la richiesta al server: ${response.status}`);
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleAddToFavorites = (game) => {
    setGames((prevGames) =>
      prevGames.map((g) => (g.title === game.title ? { ...g, isFavorite: true } : g))
    );
  };

  const handleRemoveFromFavorites = async (game) => {
    try {
      await fetch(`http://localhost:5020/games/${game._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: false }),
      });
      setGames((prevGames) =>
        prevGames.map((g) => (g.title === game.title ? { ...g, isFavorite: false } : g))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <DarkNavbar />
        <Sidebar games={games} onRemoveFromFavorites={handleRemoveFromFavorites} />
        {isLoading && <Loader src={myLoader} />}
        {error && <p>{error}</p>}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<WelcomePage />} />
          <Route
            path="/games"
            element={
              <MyCard
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                games={games}
              />
            }
          />
          <Route path="/favorites" element={<FavoritesList games={games} />} />
          // Aggiungi qui la nuova route per il componente AddGameForm
          <Route path="/addgameform" element={<AddGameForm />} />
          <Route path="/game/:_id" element={<GameDetails />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/sign-in' element={<SignIn />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
