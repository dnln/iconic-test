import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Nav from "./Nav";
import Welcome from "./Welcome";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/welcome" exact component={Welcome} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
