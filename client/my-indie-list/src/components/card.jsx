import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import Loader from '../components/loader';
import myLoader from '../assets/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart as faRegularHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style/card.css';

const DarkCard = ({ onAddToFavorites, onRemoveFromFavorites }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCardClick = (game) => {
    setSelectedGame(game);
    setIsLoading(true);
  };

  const handleModalClose = () => {
    setSelectedGame(null);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleButtonClick = async (game) => {
    if (game.isFavorite) {
      onRemoveFromFavorites(game);
    } else {
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
    }
  };
  
  

  const sortedCards = [...games].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <div className="card-container">
        {sortedCards.map((game) => (
          <Card key={game.title} bg="dark" text="white" className="w-25 m-2 game-card">
            <div style={{ position: 'relative' }}>
              <Card.Img variant="top" src={game.image} onClick={() => handleCardClick(game)} />
              <Button
                variant="dark"
                onClick={() => handleButtonClick(game)}
                disabled={game.isFavorite}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: game.isFavorite ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                  border: game.isFavorite ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
                }}
              >
                {game.isFavorite ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="text-success" /> Added to your list
                  </>
                ) : (
                  <FontAwesomeIcon icon={faRegularHeart} />
                )}
              </Button>
            </div>
            <Card.Body>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Card.Title onClick={() => handleCardClick(game)}>{game.title}</Card.Title>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedGame && (
        <Modal show={true} onHide={handleModalClose} dialogClassName="modal-dark">
          <Modal.Title style={{ textAlign: 'center', margin: '10px' }}>{selectedGame.title}</Modal.Title>
          <Modal.Body>
            {isLoading && <Loader src={myLoader} />}
            {selectedGame.videoId && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${selectedGame.videoId}`}
                  title={selectedGame.title}
                  allowFullScreen
                  onLoad={handleIframeLoad}
                ></iframe>
              </div>
            )}
            <p>{selectedGame.description}</p>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: 'center' }}>
          <Link to={`/game/${selectedGame._id}`}>
              <Button variant="dark">
                <FontAwesomeIcon icon={faInfoCircle} /> View Details
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleModalClose}>
              Torna alla lista
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default DarkCard;
