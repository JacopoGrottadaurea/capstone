import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import DarkNavbar from './components/navbar';
import GamesList from './components/card';
import WelcomePage from './components/welcome';
import Footer from './components/footer';
import AboutUs from './components/aboutus';
import Loader from './components/loader';
import myLoader from './assets/loader.gif';
import Sidebar from './components/sidebar';
import gamesData from './games/fetchinterest.json';
import GameDetails from './components/gamedetail';
import Login from './components/login'
import SignIn from './components/signin'
import AddGameForm from './components/gameform';

const gamesWithFavorites = gamesData.map((game) => ({ ...game, isFavorite: false }));

class App extends React.Component {
  state = {
    isLoading: false,
    games: gamesWithFavorites
  };

  handleStartLoading = () => {
    this.setState({ isLoading: true });
  };

  handleStopLoading = () => {
    this.setState({ isLoading: false });
  };

  handleAddToFavorites = (game) => {
    this.setState((prevState) => ({
      games: prevState.games.map((g) =>
        g.title === game.title ? { ...g, isFavorite: true } : g
      )
    }));
  };

  handleRemoveFromFavorites = (game) => {
    this.setState((prevState) => ({
      games: prevState.games.map((g) =>
        g.title === game.title ? { ...g, isFavorite: false } : g
      )
    }));
  };

  render() {
    const { isLoading, games } = this.state;

    return (
      <>
        <BrowserRouter>
          <DarkNavbar />
          <Sidebar games={games} onRemoveFromFavorites={this.handleRemoveFromFavorites} />
          {isLoading && <Loader src={myLoader} />}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <WelcomePage
                  onStartLoading={this.handleStartLoading}
                  onStopLoading={this.handleStopLoading}
                />
              }
            />
            <Route
              path="/games"
              element={
                <GamesList
                  onStartLoading={this.handleStartLoading}
                  onStopLoading={this.handleStopLoading}
                  onAddToFavorites={this.handleAddToFavorites}
                  onRemoveFromFavorites={this.handleRemoveFromFavorites}
                  games={games}
                />
              }
            />
            <Route
              path="/aboutus"
              element={
                <AboutUs
                  onStartLoading={this.handleStartLoading}
                  onStopLoading={this.handleStopLoading}
                />
              }
            />
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
  }
}

export default App;
