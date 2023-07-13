import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { useSession } from '../middleware/ProtectedRoutes';
import '../style/userpage.css'
import MyNavBar from '../components/navbar';

function UserPage() {
    const session = useSession();
    const fileInput = useRef(null);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5020/user/${session.userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')?.toString()}`
            }
        })
            .then(response => response.json())
            .then(user => {
                setProfilePicture(user.profilepicture);
            })
            .catch(error => console.error(error));
    }, []);

    const handleUpload = () => {
        const file = fileInput.current.files[0];
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:5020/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')?.toString()}`
            },
            body: formData
        })
            .then(response => response.text())
            .then(imageUrl => {
                setProfilePicture(imageUrl);
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <MyNavBar />
            <div className='user-profile-container'>
                <Container>
                    <Row className="mt-3">
                        <Col xs={12} md={4}>
                            <Image className='propic' src={profilePicture} roundedCircle />
                            <input type="file" ref={fileInput} />
                            <Button onClick={handleUpload}>Carica immagine</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserPage;
