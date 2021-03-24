import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from "react-router-bootstrap";

const NavBar = () => (
    <Navbar bg="info" variant="dark" sticky="top">
        <Navbar.Brand href="#home">Festival du Jeu</Navbar.Brand>
        <Nav className="mr-auto">
            <LinkContainer to="/festival/list">
                <Nav.Link>Festivals</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/game/list">
                <Nav.Link>Jeux</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/editor/list">
                <Nav.Link>Editeurs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/exhibitor/list">
                <Nav.Link>Exposants</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reservation/list">
                <Nav.Link>Reservations</Nav.Link>
            </LinkContainer>
        </Nav>
    </Navbar>
);

export default NavBar;
