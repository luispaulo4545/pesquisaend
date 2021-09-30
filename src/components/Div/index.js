import React, { PureComponent } from "react";
import { motion } from "../";

export default class Div extends PureComponent {
  render() {
    return (
      <motion.div
        id={this.props.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={this.props.className}
      >
        {this.props.children}
      </motion.div>
    );
  }
}
