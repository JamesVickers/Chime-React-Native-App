import React, { Component } from 'react';
import { AppRegistry, Text, View} from 'react-native';

import Component1 from './components/Component1/Component1.js';

export default class myapp extends Component {
  render() {
    return (
      <View>
        <Component1 message="Welcome to Chime"/>
      </View>
    );
  }
}

AppRegistry.registerComponent( 'myapp', () => myapp );