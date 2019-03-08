import React, { Component } from "react";
import "./RoomRow.css";
import { Room, FreePeriod } from "./Buildings";

export interface RoomListProps {
  rooms: Room[];
  freePeriods: FreePeriod[];
}

export class RoomList extends Component<RoomListProps, {}> {
  render() {
    return (
      <div className="room-list">
        {this.props.rooms.map(room => (
          <RoomRow
            key={room.id}
            room={room}
            freePeriods={this.props.freePeriods.filter(
              period => period.room_id == room.id
            )}
          />
        ))}
      </div>
    );
  }
}

export interface RoomRowProps {
  room: Room;
  freePeriods: FreePeriod[];
}
class RoomRow extends Component<RoomRowProps, {}> {
  render() {
    return (
      <div className="room-row">
        <div className="row-header">
          <span className="row-header-text">{this.props.room.name}</span>
        </div>
        <div className="row-body">
          {this.props.freePeriods.length > 0 ? (
            this.props.freePeriods
              .sort((a, b) => {
                return a.start.getHours() - b.start.getHours();
              })
              .map(period => (
                <div
                  className="row-item"
                  key={period.start.getTime()}
                  style={{
                    gridColumnStart: period.start.getHours() - 6,
                    gridColumnEnd: `span ${period.duration / 60}`
                  }}
                >
                  <span>{period.start.getHours()}:00</span>
                </div>
              ))
          ) : (
            <div
              className="row-item"
              style={{
                gridColumnStart: "4",
                gridColumnEnd: `span 8`
              }}
            >
              <span>This room is not free all day!</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RoomRow;

{
  /*gridColumnStart: period.start.getHours() - 6,
gridColumnEnd: `span ${period.duration / 60}`*/
}
