import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "..";

export default class Select extends PureComponent {
  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        style={this.props.style}
      >
        <div className="svg-wrapper">
          <FontAwesomeIcon icon={this.props.icon} />
        </div>
        <div className="vertical-line"></div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          readOnly={this.props.read}
          defaultValue={this.props.default}
        >
          <option value="default" disabled="on">
            {this.props.placeholder}
          </option>
          {this.props.children}
        </select>
      </div>
    );
  }
}
