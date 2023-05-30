import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

const Home = () => {
    const navigate = useNavigate();
    const navigateToEnrollment = () => {
        // 👇️ navigate to /contacts
        navigate('/enrollment');
      };
      const navigateToTesting = () => {
        // 👇️ navigate to /contacts
        navigate('/authentication');
      };
    return (
        <Container className="my-home">
          <Row>
            <Col>
              <Button variant="primary" size="lg" onClick={navigateToEnrollment}>
                Enrollment
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="success" size="lg" onClick={navigateToTesting}>
                Authentication
              </Button>
            </Col>
          </Row>
        </Container>
  );
}

export default Home;