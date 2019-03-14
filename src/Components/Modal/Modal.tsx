import React, { Component } from "react";
import "./Modal.css";
import Button from "../Button/Button";

export interface ModalProps {
  visible: boolean;
  title: string;
  onCloseClicked(): void;
}
class Modal extends Component<ModalProps> {
  render() {
    return (
      <div className={`modal ${this.props.visible ? "modal-visible" : ""}`}>
        <div className="modal-content">
          <div className="modal-top">
            <span className="modal-title">{this.props.title}</span>
            <Button onClick={this.props.onCloseClicked} text="Close" />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Modal;
