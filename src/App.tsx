import React, { Component } from "react";
import "./App.css";
import RoomRow, { RoomList } from "./RoomRow";
import QueryController from "./QueryController";

class App extends Component {
  render() {
    return (
      <div className="App">
        <QueryController />
        <RoomList />
      </div>
    );
  }
}

export default App;
