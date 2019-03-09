import React, { Component, KeyboardEvent } from "react";
import "./App.css";
import RoomRow, { RoomList } from "./RoomRow";
import QueryController from "./QueryController";
import firebase from "./firebase";

export interface Building {
  name: string;
  id: string;
}

export interface Room {
  name: string;
  id: string;
  building_id: string;
}

export interface FreePeriod {
  start: Date;
  end: Date;
  room_id: string;
  building_id: string;
  id: string;
  duration: number;
}

export interface AppState {
  buildings: Building[];
  building: Building;
  date: Date;
  rooms: Room[];
  freePeriods: FreePeriod[];
  pickerOpen: boolean;
  buildingsLoaded: boolean;
}
class Rooms extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      buildings: [],
      date: new Date(),
      building: { id: "loading", name: "Loading..." },
      rooms: [],
      freePeriods: [],
      pickerOpen: false,
      buildingsLoaded: false
    };
    props.match.params.building;
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("buildings")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        const buildings: Building[] = querySnapshot.docs.map(building => ({
          id: building.data().code,
          name: building.data().name
        }));
        this.setState({ buildings: buildings });
        this.setState({ building: buildings[0] });
      });

    firebase
      .firestore()
      .collection("rooms")
      .get()
      .then(querySnapshot => {
        const rooms: Room[] = querySnapshot.docs.map(room => ({
          id: room.data().code,
          name: room.data().name,
          building_id: room.data().building_code
        }));
        this.setState({ buildingsLoaded: true });
        this.setState({ rooms: rooms });
      });
  }

  addDays(date: Date, numDays: number): Date {
    let newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  updateRoomAvailabilities() {
    firebase
      .firestore()
      .collection("free-rooms")
      .where("building_code", "==", this.state.building.id)

      .where("start_free", ">=", this.addDays(this.state.date, 0))
      .where("start_free", "<=", this.addDays(this.state.date, 1))
      .get()
      .then(results => {
        let free_periods: FreePeriod[] = results.docs.map(free_period => ({
          id: free_period.data().id,
          start: free_period.data().start_free.toDate(),
          end: free_period.data().end_free.toDate(),
          duration: free_period.data().duration,
          room_id: free_period.data().room_code,
          building_id: free_period.data().building_code
        }));
        this.setState({ freePeriods: free_periods });
      });
  }

  render() {
    if (this.state.buildingsLoaded) {
      return (
        <div className="rooms-view">
          <QueryController
            buildings={this.state.buildings}
            building={this.state.building}
            date={this.state.date}
            onBuildingChange={(building: Building) => {
              this.setState({ building: building }, () =>
                this.updateRoomAvailabilities()
              );
            }}
            onDateChange={(date: Date) => {
              this.setState({ date: date }, () =>
                this.updateRoomAvailabilities()
              );
            }}
            pickerOpen={this.state.pickerOpen}
            onPickerOpenChange={open => this.setState({ pickerOpen: open })}
          />
          {!this.state.pickerOpen && (
            <RoomList
              rooms={this.state.rooms.filter(
                room => room.building_id == this.state.building.id
              )}
              freePeriods={this.state.freePeriods}
            />
          )}
        </div>
      );
    } else {
      return <div className="app-loading">Loading...</div>;
    }
  }
}

export default Rooms;
