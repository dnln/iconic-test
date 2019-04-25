import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: green;
`;

const SignUp: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <MainContainer>Sign up</MainContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
