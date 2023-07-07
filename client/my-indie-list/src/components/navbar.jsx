import React, { useContext, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from './authprovider'; // Importa AuthContext

function DarkNavBar() {
  const [username, setUsername] = useState(null);
  // Recupera il valore di username dalle props
  const { accessToken, logout, fetchUserData } = useContext(AuthContext);
  // Utilizza l'hook useState per memorizzare il nome utente e l'URL dell'immagine del profilo nello stato del componente


  useEffect(() => {
    if (accessToken) {
      // Recupera il nome utente e l'URL dell'immagine del profilo dal localStorage
      fetchUserData();
      const username = localStorage.getItem('username');

      console.log('Valore di username dal comonente LOGIN salvato nel localStorage:', username);
      setUsername(username);
      
      // Aggiorna lo stato del componente con i valori recuperati dal localStorage
    }
  }, [accessToken]);

  const handleLogout = () => {
    // Utilizza la funzione logout fornita da AuthProvider
    logout();

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
          {accessToken ? (
            <>
              {/* {profileImage && (
                <img src={profileImage} alt={username} width={30} height={30} />
              )}*/}
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
