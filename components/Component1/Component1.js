import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";

export default class Component1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "Jay",
      showName: true
    };
  }

  render() {
    let name = this.state.showName ? this.state.name : "No name";
    return (
      <View>
        <Text>{this.props.message}</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("Component1", () => Component1);
