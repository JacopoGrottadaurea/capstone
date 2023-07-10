import React, { useEffect, useState } from 'react';
import '../style/navbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSession } from '../middleware/ProtectedRoutes';

function MyNavBar() {

  const session = useSession();


  // Revoca Token

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  const handleLogout = () => {
    // Utilizza la funzione logout fornita da AuthProvider
    logout();

    // Reindirizza l'utente alla pagina di accesso
    window.location.href = '/home';
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
        {session ? (
          <Nav className="m-auto">
            <Link to="/home" className="nav-link">Home</Link>
            <Nav.Link href="/games" className="nav-link">Games</Nav.Link>
            <Nav.Link href="/search" className="nav-link">Search</Nav.Link>
            <NavDropdown className="navigation-dropdown" title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/add-game">Aggiungi gioco</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/aboutus">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#">Contact Us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="m-auto">
            <Link to="/aboutus" className="nav-link">About Indie List!</Link>
          </Nav>
        )}
        <div className="ml-auto">
          {session ? (
            <>
              <div className="profile-container">
                <img src={session.profilepicture} alt={session.username} width={30} height={30} />
                <NavDropdown title={session.username} className="nav-dropdown-title" >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </>
          ) : (
            <>
              <div className="button-container">
                <Link to="/login">
                  <Button variant="outline-light" className="mr-2">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-light" className="mr-2">Registrati</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
