import React from 'react';
import logoSvg from "../../../assets/images/logo-haku.svg";
import "./Header.css";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <svg width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <image href={logoSvg} width="100%" height="100%" />
                    </svg>
                </Navbar.Brand>
                <Nav className="nav-container justify-content-evenly">
                    <Nav.Item>
                        <Link className="link-nav" to='/'>Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="link-nav" to='/create'>Crear</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="link-nav" to='/show'>Productos</Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}
