import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Implement logout logic, such as clearing tokens or user data from local storage
    // Redirect to the login page after logout
    history.push('/login');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Welcome to Your User Page!</h2>
          <p>This is a protected page for authenticated users.</p>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
