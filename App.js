import React, { Component } from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";
import { createStackNavigator } from "react-navigation";

//must type react-native link react-native-sound in command line
var Sound = require("react-native-sound");
Sound.setCategory("Playback");
var bell = new Sound("bell.wav", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
  } else {
    console.log("duration in seconds: " + bell.getDuration());
  }
});

function playBell() {
  bell.play(success => {
    if (success) {
      console.log("successfully finished playing");
    } else {
      console.log("playback failed due to audio decoding errors");
    }
  });
}

class HomeScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require("./assets/img/smoke.png")}
        style={mainStyles.mainView}
      >
        <Text>Chime</Text>
        <TouchableHighlight
          title="Enter"
          onPress={() => this.props.navigation.navigate("Details")}
        >
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
        source={require("./assets/img/smoke.png")}
        style={mainStyles.mainView}
      >
        <View style={mainStyles.modalView}>
          <Text>Welcome</Text>
          <TouchableHighlight
            title="Click here to begin..."
            onPress={() => this.props.navigation.navigate("TimerScreen")}
          >
            <View>
              <Text>Click here to begin...</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return <Text>It is {this.state.date.toLocaleTimeString()}.</Text>;
  }
}

class TimerScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require("./assets/img/smoke.png")}
        style={mainStyles.mainView}
      >
        <Text>Timer Screen</Text>
        <TouchableHighlight title="Play" onPress={() => playBell()}>
          <View>
            <Text>Play sound</Text>
            <Clock />
          </View>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

const mainStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  modalView: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    height: "85%",
    backgroundColor: "rgba(160, 160, 160, 0.85)",
    borderRadius: 5
  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: welcomeScreen,
    TimerScreen: TimerScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
