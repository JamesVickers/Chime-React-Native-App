///////////////
//NAVIGATOR DEPRECATED
//////////////////

import React, { Component } from "react";
import { AppRegistry, Text, View, Navigator } from "react-native";

import Component5 from "./components/Component5/Component5.js";

export default class myapp extends Component {
  render() {
    return <Component5 />;
  }
}

AppRegistry.registerComponent("myapp", () => myapp);
