import React, { Component } from "react";
import "./QueryController.css";
import { DownArrow } from "./DownArrow";
import Select, { components } from "react-select";
import { NONAME } from "dns";
import { IndicatorProps } from "react-select/lib/components/indicators";

class QueryController extends Component {
  options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  render() {
    const customStyles = {
      option: (provided: any, state: any) => ({
        ...provided,
        fontFamily: "HelveticaNeue-Bold",
        fontSize: "60px",
        background: "linear-gradient(90deg, #2b32b2 0%, #1488cc 150%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "#ffffff"
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
        background: "linear-gradient(90deg, #2b32b2 0%, #1488cc 150%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "#ffffff"
      }),
      input: (provided: any, state: any) => ({
        fontSize: "60px",
        //color: "#2b32b2",
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
        {/*<div className="room-picker">
          <span className="room-title">Hilmer Building</span>
          <div className="room-picker-arrow" >
            <DownArrow />
          </div>
	</div>*/}
        <Select
          options={this.options}
          classNamePrefix="react-select"
          styles={customStyles}
          components={{ DropdownIndicator }}
        />

        <div className="day-picker">
          <div className="day-picker-arrow">
            <DownArrow degrees={90} />
          </div>
          <span className="day-title">Today</span>
          <div className="day-picker-arrow">
            <DownArrow degrees={-90} />
          </div>
        </div>
      </div>
    );
  }
}

export default QueryController;
