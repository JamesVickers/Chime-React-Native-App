import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  render() {
    return (
      <ImageBackground 
        source={require('./assets/img/smoke.png')}
        style={mainStyles.mainView}>
        <Text>Chime</Text>
        <TouchableHighlight 
          title="Enter"
          onPress={() => this.props.navigation.navigate('Details')}>
          <View>
            <Text>Enter</Text>
          </View>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

class welcomeScreen extends Component {
  render() {
    return (
      <ImageBackground 
        source={require('./assets/img/smoke.png')}
        style={mainStyles.mainView}>
        <View style={mainStyles.modalView}>
          <Text>Welcome</Text>
          <TouchableHighlight
            title="Click here to begin..."
            onPress={() => this.props.navigation.navigate('Creators')}>
            <View>
              <Text>Click here to begin...</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

class TimerScreen extends Component {
  render() {
    return (
      <ImageBackground 
        source={require('./assets/img/smoke.png')}
        style={mainStyles.mainView}>
        <Text>Timer Screen</Text>
      </ImageBackground>
    );
  }
}

const mainStyles = StyleSheet.create ({
  mainView : {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  modalView: {
    alignItems: 'center', 
    justifyContent: 'space-around',
    width: '85%',
    height: '85%',
    backgroundColor: 'rgba(160, 160, 160, 0.85)',
    borderRadius: 5
  }
});

const RootStack = createStackNavigator(
  {
  Home: HomeScreen,
  Details: welcomeScreen,
  Creators: TimerScreen,
},
{
  initialRouteName: 'Home',
}
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}