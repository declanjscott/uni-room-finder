import React, { Component } from "react";
import "./Button.css";

export interface ButtonProps {
  text: string;
  onClick(): void;
}

class Button extends Component<ButtonProps> {
  render() {
    return (
      <div className="button" onClick={() => this.props.onClick()}>
        {this.props.text}
      </div>
    );
  }
}
export default Button;
