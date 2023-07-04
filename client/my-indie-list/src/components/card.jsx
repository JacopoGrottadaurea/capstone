import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import Loader from '../components/loader';
import myLoader from '../assets/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart as faRegularHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style/card.css';

const MyCard = ({ game, onAddToFavorites, onRemoveFromFavorites, selectedGame, setSelectedGame }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!game) {
    return null;
  }

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
          onAddToFavorites(game);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Card bg="dark" text="white" className="m-2 game-card">
        <div>
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
          <div >
            <Card.Title onClick={() => handleCardClick(game)}>{game.title}</Card.Title>
          </div>
        </Card.Body>
      </Card>

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

export default MyCard;

