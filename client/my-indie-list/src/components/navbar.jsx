import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function DarkNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Verifica se l'utente ha effettuato l'accesso
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      // Recupera i dati dell'utente dal server
      fetch('http://localhost:5020/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setUsername(data.username);
          setProfilePicture(data.profilePicture);
        });
    }
  }, []);

  const handleLogout = () => {
    // Rimuovi il token dal client
    localStorage.removeItem('token');
  
    // Reindirizza l'utente alla pagina di accesso
    window.location.href = '/login';
  }
  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky='top'>
      <Navbar.Brand href="/home">
        <img
          alt="IndieListLogo"
          src={logo}
          width="80"
          height="50"
          className="my-logo"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Link to="/home" className="nav-link">Home</Link>
          <Nav.Link href="/games" className="nav-link">Games</Nav.Link>
          <Nav.Link href="/search" className="nav-link">Search</Nav.Link>
          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item href="/addgameform">Aggiungi gioco</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/aboutus">About Us</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Contact Us</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div className="ml-auto">
          {isLoggedIn ? (
            <>
              <img src={profilePicture} alt={username} width={30} height={30} />
              <span className="navbar-text">{username}</span>
              <Button variant="outline-light" className="ml-2" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline-light" className="mr-2">Login</Button>
              </Link>
              <Link to="/sign-in">
                <Button variant="outline-light">Registrati</Button>
              </Link>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
  


export default DarkNavBar;
