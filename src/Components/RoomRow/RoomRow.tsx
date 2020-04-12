import React, { Component } from "react";
import "./RoomRow.css";
import { FreePeriod, Room } from "../../Interfaces";

export interface RoomListProps {
  rooms: Room[];
  freePeriods: FreePeriod[];
}

/**
 * The list of rooms in a building
 */
export class RoomList extends Component<RoomListProps, {}> {
  render() {
    return (
      <div className="room-list">
        <div className="list-header">
          <div className="row-body">
            {[...Array(10)].map((x, i) => (
              <div
                key={i}
                className="list-header-item"
                style={{
                  gridColumnStart: i * 2 + 1,
                  gridColumnEnd: `span 2`
                }}
              >
                <span>
                  {i + 9 > 12
                    ? `${i + 9 - 12}pm`
                    : i + 9 === 12
                    ? `${i + 9}pm`
                    : `${i + 9}am`}
                </span>
              </div>
            ))}
          </div>
        </div>
        {this.props.rooms.map(room => (
          <RoomRow
            key={room.id}
            room={room}
            freePeriods={this.props.freePeriods.filter(
              period => period.room_id === room.id
            )}
          />
        ))}
      </div>
    );
  }
}

/**
 * Shows the availaiblty of a single room
 */
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
        <div
          className={
            this.props.freePeriods.filter(period => period.visible).length === 0
              ? "row-body-empty"
              : "row-body"
          }
        >
          {this.props.freePeriods
            .sort((a, b) => {
              return a.start.getHours() - b.start.getHours();
            })
            .map(
              period =>
                period.visible && (
                  <div
                    className={`row-item ${
                      period.duration <= 90 ? "row-item-center" : ""
                    }`}
                    key={period.start.getTime()}
                    style={{
                      gridColumnStart: this.getPeriodStartColumn(period),
                      gridColumnEnd: this.getPeriodNumSpans(period)
                    }}
                  >
                    <span>{this.getPeriodString(period)}</span>
                  </div>
                )
            )}

          {this.props.freePeriods.filter(period => period.visible).length ===
            0 && <span>{this.props.room.name} is not free today</span>}
        </div>
      </div>
    );
  }

  static hourToString(hour: number) {
    if (hour === 12) {
      return "12pm";
    } else if (hour < 12) {
      return `${hour}am`;
    } else {
      return `${hour - 12}pm`;
    }
  }

  getPeriodString(period: FreePeriod): string {
    if (period.duration <= 60) {
      return RoomRow.hourToString(period.start.getHours());
    } else {
      return `${RoomRow.hourToString(
        period.start.getHours()
      )} - ${RoomRow.hourToString(period.end.getHours())}`;
    }
  }

  getPeriodStartColumn(period: FreePeriod) {
    // the grid starts at 9am so we return the hour relative to 9am
    return (
      (period.start.getHours() - 9) * 2 + 1 + period.start.getMinutes() / 30
    );
  }

  getPeriodNumSpans(period: FreePeriod) {
    //the grid ends at 7pm so we cap the end time
    return `span ${period.duration / 30}`;
  }
}

export default RoomRow;
