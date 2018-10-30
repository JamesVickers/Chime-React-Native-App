import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  render() {
    return (
      <ImageBackground 
        source={require('./assets/img/smoke.png')}
        style={homeStyles.mainView}>
        <Text>Home Screen</Text>
        <TouchableHighlight 
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}>
          <View>
            <Text>Go to details</Text>
          </View>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

const homeStyles = StyleSheet.create ({
  mainView : {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});

class DetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <TouchableHighlight
          title="Go to Creators"
          onPress={() => this.props.navigation.navigate('Creators')}>
          <View>
            <Text>Go to Creators</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class CreatorsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Creators Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
  Home: HomeScreen,
  Details: DetailsScreen,
  Creators: CreatorsScreen,
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