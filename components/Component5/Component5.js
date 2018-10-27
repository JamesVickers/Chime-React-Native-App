import React, { Component } from "react";
import { AppRegistry, Text, View, ListView, StyleSheet } from "react-native";

export default class Component5 extends Component {
  constructor() {
    super();
    //see docs for new list view constructor
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      userDataSource: ds
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(response => {
        this.setState({
          userDataSource: this.state.userDataSource.cloneWithRows(response)
        });
      });
  }

  renderRow(user, sectionId, rowId, highlightRow) {
    return (
      <View>
        <Text>
          {user.name}: {user.email}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.userDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

AppRegistry.registerComponent("Component5", () => Component5);
