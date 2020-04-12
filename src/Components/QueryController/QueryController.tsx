import React, { Component } from "react";
import "./QueryController.css";
import DatePicker from "../DatePicker/DatePicker";
import { Building } from "../../Interfaces";
import Picker from "../Picker/Picker";

export interface QueryProps {
  date: Date;
  building: Building;
  onBuildingChange(building: Building): void;
  onDateChange(date: Date): void;
  onPickerOpenChange(open: boolean): void;
  pickerOpen: boolean;
  buildings: Building[];
}

/**
 * Contains the room picker and a date picker.
 * Used by the user to create a query as to what building
 * they want to look at at what time
 */
class QueryController extends Component<QueryProps, {}> {
  newOptionSelected(buildingId: string) {
    const building = this.props.buildings.find(
      building => building.id === buildingId
    );
    if (building != null) this.props.onBuildingChange(building);
  }

  render() {
    return (
      <div className="query-controller">
        <Picker
          options={this.props.buildings.map(building => ({
            value: building.id,
            label: building.name
          }))}
          selectedOption={{
            value: this.props.building.id,
            label: this.props.building.name
          }}
          onOptionChange={option => this.newOptionSelected(option.value)}
          onPickerOpen={open => {
            this.props.onPickerOpenChange(open);
          }}
          pickerOpen={this.props.pickerOpen}
        />
        {!this.props.pickerOpen && (
          <DatePicker
            date={this.props.date}
            onDateChange={(date: Date) => this.props.onDateChange(date)}
          />
        )}
      </div>
    );
  }
}

export default QueryController;
