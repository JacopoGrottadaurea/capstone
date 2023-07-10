import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { useSession } from '../middleware/ProtectedRoutes';

function UserPage() {

    const session = useSession()

    return (
        <Container>
            <Row className="mt-3">
                <Col xs={12} md={4}>
                    <Image src="https://via.placeholder.com/150" roundedCircle />
                </Col>
                <Col xs={12} md={8}>
                    <h2>Nome Utente</h2>
                    <p>Descrizione Utente</p>
                    <Button variant="primary">Segui</Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12}>
                    <Card>
                        <Card.Header>Post</Card.Header>
                        <Card.Body>
                            <Card.Text>Contenuto del post</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserPage;
