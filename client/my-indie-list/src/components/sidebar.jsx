import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/sidebar.css';
import FavoriteGame from './favoritegame';

const Sidebar = ({ games, onRemoveFromFavorites }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
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
            <FavoriteGame key={game.title} game={game} onRemoveFromFavorites={onRemoveFromFavorites} />
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;
