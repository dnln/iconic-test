import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Login from "./Login";
import SignUp from "./SignUp";
import Nav from "./Nav";

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
