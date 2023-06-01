import React from "react";
import { useNavigate } from "react-router-dom";
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
        <Container style={{ backgroundImage: `url('../../public/bg.jpg')` }}>
          <Row className="p-4">
            <Col>
              <Button variant="primary" size="lg" onClick={navigateToEnrollment} style={{width:"200px", height:"100px"}}>
                Enrollment
              </Button>
            </Col>
          </Row>
          <Row className="p-4">
            <Col>
              <Button variant="success" size="lg" onClick={navigateToTesting} style={{width:"200px", height:"100px"}}>
                Authentication
              </Button>
            </Col>
          </Row>
        </Container>
  );
}

export default Home;