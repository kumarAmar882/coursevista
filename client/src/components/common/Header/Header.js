import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import './Header.css';
import AuthModal from '../../auth/AuthModal/AuthModal';
import AuthService from '../../../services/authService';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    setLoading(false);
  };

  const handleModalShow = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const userData = await AuthService.login(formData);
      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle login error if needed
    } finally {
      setLoading(false);
      handleModalClose();
    }
  };

  const handleSignup = async (formData) => {
    setLoading(true);
    try {
      const userData = await AuthService.signup(formData);
      console.log('Signup successful:', userData);
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Handle signup error if needed
    } finally {
      setLoading(false);
      handleModalClose();
    }
  };

  const handleResetPassword = async (formData) => {
    setLoading(true);
    try {
      if (formData.token) {
        // Resetting the password (token is present)
        const result = await AuthService.resetPassword(formData.email, formData.token, formData.newPassword);
        console.log('Password reset successful:', result);
        // Handle the result as needed
      } else {
        // Requesting a password reset (no token)
        const result = await AuthService.resetPassword(formData.email);
        console.log('Password reset initiated:', result);
        // Handle the result as needed
      }
    } catch (error) {
      console.error('Error during password reset:', error.message);
      // Handle password reset error if needed
    } finally {
      setLoading(false);
      handleModalClose();
    }
  };

  const handleRequestResetPassword = async (formData) => {
    setLoading(true);
    try {
      // Requesting a password reset (no token)
      const result = await AuthService.resetPassword(formData.email);
      console.log('Password reset initiated:', result);
      // Handle the result as needed
    } catch (error) {
      console.error('Error during password reset:', error.message);
      // Handle password reset error if needed
    } finally {
      setLoading(false);
      handleModalClose();
    }
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">CourseVista</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#courses">Course</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#category1">Category 1</NavDropdown.Item>
                <NavDropdown.Item href="#category2">Category 2</NavDropdown.Item>
                <NavDropdown.Item href="#category3">Category 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <Button variant="outline-light" onClick={() => handleModalShow('login')}>
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal
        showModal={showModal}
        handleClose={handleModalClose}
        modalType={modalType}
        handleModalShow={handleModalShow}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        handleResetPassword={handleResetPassword}
        handleRequestResetPassword={handleRequestResetPassword} // Added handler for request reset
        loading={loading}
      />
    </>
  );
};

export default NavBar;
