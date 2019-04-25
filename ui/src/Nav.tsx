import React, { Component } from "react";
import BSNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";

const Navbar = styled(BSNavbar)`
  justify-content: space-between;
`;

class Nav extends Component<RouteComponentProps> {
  logout(props: RouteComponentProps) {
    localStorage.clear();
    props.history.push("/login");
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <BSNavbar.Brand href="#home">iconic-login</BSNavbar.Brand>
        <Button
          onClick={() => this.logout(this.props)}
          variant="outline-light"
          size="sm"
        >
          Logout
        </Button>
      </Navbar>
    );
  }
}

export default withRouter(Nav);
