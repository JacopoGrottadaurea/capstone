import React from 'react';
import { Card } from 'react-bootstrap';

const FavoritesList = ({ games }) => {
  console.log('Giochi ricevuti come prop:', games); // Aggiungi questa riga
  const favorites = games.filter((game) => game.isFavorite);

  return (
    <>
      {favorites.map((game) => (
        <Card key={game.title}>
          <Card.Body>
            <Card.Title>{game.title}</Card.Title>
            <Card.Text>{game.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default FavoritesList;
