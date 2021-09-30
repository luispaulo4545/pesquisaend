import React, { PureComponent } from "react";

export default class ConfirmButton extends PureComponent {
  render() {
    const classe = this.props.className;

    return (
      <button
        disabled={this.props.disabled}
        className={classe ? classe : "confirm-button"}
        type={this.props.type}
      >
        {this.props.text}
      </button>
    );
  }
}
