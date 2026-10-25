import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaUtensils } from 'react-icons/fa';

const AppNavbar = ({ favoritesCount }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold">
          <FaUtensils className="text-warning" /> Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end className="fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites" className="fw-semibold d-flex align-items-center gap-1">
              <FaHeart className="text-danger" /> Favorites
              {favoritesCount > 0 && (
                <span className="badge bg-danger rounded-pill ms-1">{favoritesCount}</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;