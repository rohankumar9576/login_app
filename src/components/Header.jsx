import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>

    <Navbar bg="light" expand="lg">
      <Container className='mt-4'>
        <Navbar.Brand href="/">Website Learners</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          
          </Nav>
          <Link to="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button className='mx-2' variant="outline-primary">Log In</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Header;
