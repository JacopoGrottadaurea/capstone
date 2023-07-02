import products from '../books/fantasy.json';
import { Card } from 'react-bootstrap';

function GamesList() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <Card key={product.asin} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

export default GamesList;