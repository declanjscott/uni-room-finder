import React, { Component, KeyboardEvent } from "react";
import "./FreeRooms.css";
import { RoomList } from "../RoomRow/RoomRow";
import QueryController from "../QueryController/QueryController";
import firebase from "../../firebase";
import { FreePeriod, Building, Room } from "../../Interfaces";
import Modal, { ModalProps } from "../Modal/Modal";
import Button from "../Button/Button";

export interface FreeRoomState {
  buildings: Building[];
  building: Building;
  date: Date;
  rooms: Room[];
  freePeriods: FreePeriod[];
  pickerOpen: boolean;
  buildingsLoaded: boolean;
  helpModalIsOpen: boolean;
}

/**
 *
 */

class FreeRooms extends Component<{}, FreeRoomState> {
  constructor(props: any) {
    super(props);
    this.state = {
      buildings: [],
      date: new Date(),
      building: { id: "loading", name: "Loading..." },
      rooms: [],
      freePeriods: [],
      pickerOpen: false,
      buildingsLoaded: false,
      helpModalIsOpen: false
    };
    //props.match.params.building;
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
          building_id: free_period.data().building_code,
          visible: true
        }));
        free_periods = free_periods.map(free_period =>
          this.trimPeriodToDisplayedhours(free_period)
        );
        this.setState({ freePeriods: free_periods });
      });
  }

  render() {
    if (this.state.buildingsLoaded) {
      return (
        <div className="rooms-view">
          <div className="top-bar">
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
            <div className="info-area">
              <div className="current-term-info">Trimester 1 2019</div>
              <Button
                onClick={() => this.setState({ helpModalIsOpen: true })}
                text="About"
              />
            </div>
          </div>
          {!this.state.pickerOpen && (
            <RoomList
              rooms={this.state.rooms.filter(
                room => room.building_id == this.state.building.id
              )}
              freePeriods={this.state.freePeriods}
            />
          )}
          <AboutModal
            visible={this.state.helpModalIsOpen}
            title="UNSW Free Room Finder"
            onCloseClicked={() => this.setState({ helpModalIsOpen: false })}
          />
        </div>
      );
    } else {
      return <div className="app-loading">Loading...</div>;
    }
  }

  trimPeriodToDisplayedhours(period: FreePeriod): FreePeriod {
    if (period.end.getHours() <= 9) {
      period.visible = false;
    } else if (period.start.getHours() < 9) {
      let period_reduced_by = 9 - period.start.getHours();
      period.duration = period.duration - period_reduced_by * 60;
      period.start.setHours(9);
    }
    if (period.start.getHours() >= 19) {
      period.visible = false;
    } else if (period.end.getHours() > 19) {
      let period_reduced_by = period.end.getHours() - 19;
      period.duration = period.duration - period_reduced_by * 60;
      period.end.setHours(19);
    }
    if (period.duration == 0) {
      period.visible = false;
    }
    return period;
  }
}

export default FreeRooms;

class AboutModal extends Component<ModalProps> {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        title={this.props.title}
        onCloseClicked={this.props.onCloseClicked}
      >
        <p>
          This app shows you free rooms on campus at UNSW, according to the{" "}
          <a href="https://nss.cse.unsw.edu.au/tt/">timetable</a>.
        </p>
        <p>
          There are lots of free rooms across campus throughout the day, so
          hopefully this app helps you find a spot to study outside the library.
        </p>
        <p>
          If any data is wrong (or you would like to help make the app look
          pretty 🎨) please contact me at{" "}
          <a href="mailto:declan.scott@student.unsw.edu.au" target="_top">
            my uni email address.
          </a>
        </p>
        <p>
          I (Declan Scott) made this project to learn React and hopefully help
          people enjoy their time on campus. ❤️
        </p>
      </Modal>
    );
  }
}
