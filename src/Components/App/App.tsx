import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Buildings from "../FreeRooms/FreeRooms";
import Footer from "../Footer/Footer";

/**
 * App loads the FreeRooms view, and the Footer.
 */
class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Redirect to="/buildings/" />
              </Route>
              <Route path="/buildings/:building?" component={Buildings} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
