import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Buildings from "./Buildings";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Buildings} />
          <Route path="/buildings/:building" component={Buildings} />
        </div>
      </Router>
    );
  }
}

export default App;
