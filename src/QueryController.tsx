import React, { Component } from "react";
import "./QueryController.css";
import { DownArrow } from "./DownArrow";
import Select, { components } from "react-select";
import { NONAME } from "dns";
import { IndicatorProps } from "react-select/lib/components/indicators";
import DatePicker from "./DatePicker";
import { Building } from "./Buildings";

export interface QueryProps {
  date: Date;
  building: Building;
  onBuildingChange(building: Building): void;
  onDateChange(date: Date): void;
  buildings: Building[];
}

class QueryController extends Component<QueryProps, {}> {
  newBuildingSelected(buildingId: string) {
    const building = this.props.buildings.find(
      building => building.id === buildingId
    );
    if (building != null) this.props.onBuildingChange(building);
  }

  render() {
    const customStyles = {
      option: (provided: any, state: any) => ({
        ...provided,
        fontFamily: "HelveticaNeue-Bold",
        fontSize: "60px",
        color: "#2b32b2",
        fontWeight: 700,
        backgroundColor: state.isFocused ? "lightgray" : "white"
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        background: "none",
        border: "none",
        borderColor: "none",
        boxShadow: "none"
      }),
      indicatorSeparator: () => ({
        display: "none"
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        fontFamily: "HelveticaNeue-Bold",
        fontSize: "60px",
        color: "#2b32b2",
        fontWeight: 700
      }),
      input: (provided: any, state: any) => ({
        fontSize: "60px",
        color: "#2b32b2",
        fontWeight: 700,
        fontFamily: "HelveticaNeue-Bold"

        //background: "linear-gradient(90deg, #2b32b2 0%, #1488cc 150%)",
        //WebkitBackgroundClip: "text"
      }),
      dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        height: "40px",
        width: "40px",
        transition: "300ms ease-in-out"
      }),
      indicatorsContainer: (provided: any, state: any) => ({
        ...provided
      })
    };

    const DropdownIndicator = (props: IndicatorProps<any>) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <DownArrow
              degrees={props.selectProps.menuIsOpen ? 180 : 0}
              animated={true}
            />
          </components.DropdownIndicator>
        )
      );
    };

    return (
      <div className="query-controller">
        <Select
          options={this.props.buildings.map(building => ({
            value: building.id,
            label: building.name
          }))}
          classNamePrefix="react-select"
          styles={customStyles}
          components={{ DropdownIndicator }}
          defaultValue={{
            value: "loading",
            label: "Loading..."
          }}
          value={{
            value: this.props.building.id,
            label: this.props.building.name
          }}
          onChange={event => {
            if (event == null || Array.isArray(event)) {
              throw new Error(
                "Unexpected type passed to ReactSelect onChange handler"
              );
            }
            this.newBuildingSelected(event.value);
          }}
        />
        <DatePicker
          date={this.props.date}
          onDateChange={(date: Date) => this.props.onDateChange(date)}
        />
      </div>
    );
  }
}

export default QueryController;
