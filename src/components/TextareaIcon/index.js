import React, { PureComponent } from "react";
import Image from "next/image";

export default class InputIcon extends PureComponent {
  render() {
    return (
      <div className={this.props.className}>
        <textarea
          placeholder="Digite aqui..."
          type={this.props.type}
          spellCheck={false}
          autoComplete={this.props.complete}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
