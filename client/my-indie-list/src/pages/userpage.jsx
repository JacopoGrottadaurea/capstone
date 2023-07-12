import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { useSession } from '../middleware/ProtectedRoutes';
import '../style/userpage.css'
import MyNavBar from '../components/navbar';

function UserPage() {

    const session = useSession()

    return (
        <>
            <MyNavBar />
            <div className='user-profile-container'>
                <Container >
                    <Row className="mt-3">
                        <Col xs={12} md={4}>
                            <Image className='propic' src={session.profilepicture} roundedCircle />
                        </Col>
                        <Col >
                            <h2>{session.username}</h2>
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
            </div>
        </>
    );
};

export default UserPage;
