import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Buildings from "./Buildings";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to="/buildings/" />
            </Route>
            <Route path="/buildings/:building?" component={Buildings} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
