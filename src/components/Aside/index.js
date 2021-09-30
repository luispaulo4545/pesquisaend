import React, { PureComponent } from "react";
import { motion } from "..";

export default class Aside extends PureComponent {
  render() {
    return (
      <motion.aside
        id={this.props.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {this.props.children}
      </motion.aside>
    );
  }
}
