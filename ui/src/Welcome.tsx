import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";

const MainContainer = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

class Welcome extends Component<RouteComponentProps> {
  state = {
    fullName: ""
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.props.history.push("/login");
    }

    const response = await fetch("http://localhost:3002/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const body = await response.json();

      this.setState({ fullName: body.fullName });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <MainContainer>Welcome, {this.state.fullName}</MainContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Welcome;
