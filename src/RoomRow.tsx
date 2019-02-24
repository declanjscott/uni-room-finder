import React, { Component } from "react";
import "./RoomRow.css";

export class RoomList extends Component {
  render() {
    return (
      <div className="room-list">
        <RoomRow />
        <RoomRow />
        <RoomRow />
        <RoomRow />
      </div>
    );
  }
}

class RoomRow extends Component {
  render() {
    return (
      <div className="room-row">
        <div className="row-header">
          <span className="row-header-text">G16</span>
        </div>
        <div className="row-body">
          <div
            className="row-item"
            style={{ gridColumnStart: "2", gridColumnEnd: "span 2" }}
          >
            <span>9:00</span>
          </div>

          <div
            className="row-item"
            style={{ gridColumnStart: "6", gridColumnEnd: "span 4" }}
          >
            <span>9:00</span>
          </div>

          <div
            className="row-item"
            style={{ gridColumnStart: "12", gridColumnEnd: "span 3" }}
          >
            <span>9:00</span>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomRow;
