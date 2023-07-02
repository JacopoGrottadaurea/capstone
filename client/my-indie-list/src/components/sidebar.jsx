import React, { useState } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style/sidebar.css';

const Sidebar = ({ games, onRemoveFromFavorites }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const handleRemoveFromFavorites = async (game) => {
    if (window.confirm('Sei sicuro di voler eliminare questo gioco dai preferiti?')) {
      onRemoveFromFavorites(game);
    }
  };

  const favorites = games.filter((game) => game.isFavorite);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ backgroundColor: '#171717', color: 'white' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#171717',
        }}
      >
        <h4 className="sidebar-title">Lista dei preferiti</h4>
        <Button variant="dark" className="sidebar-collapse-button" onClick={handleToggleCollapse}>
          <FontAwesomeIcon icon={isCollapsed ? faChevronUp : faChevronDown} />
        </Button>
      </div>
      {!isCollapsed && (
        <>
          {favorites.map((game) => (
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
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;
