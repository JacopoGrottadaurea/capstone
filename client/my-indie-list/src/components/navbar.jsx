import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function DarkNavBar() {
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
          <Link to="/login">
            <Button variant="outline-light" className="mr-2">Login</Button>
          </Link>
          <Link to="/sign-in">
            <Button variant="outline-light">Registrati</Button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DarkNavBar;
