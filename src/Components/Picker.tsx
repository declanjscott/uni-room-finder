import React, { Component } from "react";
import "./Picker.css";
import { DownArrow } from "./DownArrow";

export interface Option {
  value: string;
  label: string;
}
export interface PickerProps {
  options: Option[];
  onOptionChange(option: Option): void;
  onPickerOpen(open: boolean): void;
  pickerOpen: boolean;
  selectedOption: Option;
}

class Picker extends Component<PickerProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedOption: props.options[0]
    };
  }

  private selectOption(option: Option) {
    this.props.onPickerOpen(false);
    this.props.onOptionChange(option);
    window.scrollTo(0, 0);
  }

  toggleDropdown(open?: boolean) {
    let newState = !this.props.pickerOpen;
    if (open != null) {
      newState = open;
    }
    this.props.onPickerOpen(newState);
  }

  render() {
    return (
      <div className="picker">
        <div className="input-area" onClick={() => this.toggleDropdown()}>
          <div className="selected-option">
            {this.props.selectedOption ? this.props.selectedOption.label : ""}
          </div>
          <div className="picker-toggle-button">
            <DownArrow
              degrees={this.props.pickerOpen ? 180 : 0}
              animated={true}
            />
          </div>
        </div>
        {
          <div
            className={`options-dropdown ${
              this.props.pickerOpen ? "" : "no-height"
            }`}
          >
            {this.props.options.map(option => (
              <div
                className="options-dropdown-item"
                onClick={() => this.selectOption(option)}
                key={option.value}
              >
                {option.label}
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

export default Picker;
