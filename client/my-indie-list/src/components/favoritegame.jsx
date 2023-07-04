import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FavoriteGame = ({ game, onRemoveFromFavorites }) => {
  const handleRemoveFromFavorites = async (game) => {
    if (window.confirm('Sei sicuro di voler eliminare questo gioco dai preferiti?')) {
      onRemoveFromFavorites(game);
    }
  };

  return (
    <Card key={game.title} bg="dark" text="white" className="mb-0">
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={`/game/${game._id}`}>
            <Card.Title>
              <img
                src={game.image}
                alt={game.title}
                style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }}
              />
              <div
                className={`title-container ${game.title.length > 12 ? 'scrolling-title' : ''}`}
                style={{ maxWidth: '150px', overflow: 'hidden' }}
              >
                <span>{game.title}</span>
              </div>
            </Card.Title>
          </Link>

          <Dropdown>
            <Dropdown.Toggle as="div" variant="none" id={`dropdown-basic`}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRemoveFromFavorites(game)}>
                <FontAwesomeIcon icon={faTrashAlt} /> Elimina
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FavoriteGame;
