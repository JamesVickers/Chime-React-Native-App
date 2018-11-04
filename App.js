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
        <Text style={mainStyles.text}>Chime</Text>
        <TouchableHighlight
          title="Enter"
          onPress={() => this.props.navigation.navigate("Details")}
        >
          <View>
            <Text style={mainStyles.text}>Enter</Text>
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
          <Text style={mainStyles.text}>Welcome</Text>
          <TouchableHighlight
            title="Click here to begin..."
            onPress={() => this.props.navigation.navigate("TimerScreen")}
          >
            <View>
              <Text style={mainStyles.text}>Click here to begin...</Text>
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
    this.state = { 
      startTime: new Date(),
      currentTime: new Date(),
      input: 20
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setEndTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date()
    });
  }
  
  setEndTime(state) {
    let clonedStart = { ...this.state }.startTime;
    let minutes = new Date(clonedStart).getMinutes();

    let minutesToSet = minutes + 10;
    let end = clonedStart.setMinutes(minutesToSet);
    let blah = new Date(end);
    let time = blah.toLocaleTimeString();

    this.setState(state => ({
      endTime: time
    }));
  }

  render() {
    return (
    <View>
      <Text style={mainStyles.text}>You started at: { this.state.startTime.toLocaleTimeString() } </Text>
      <Text style={mainStyles.text}>The time is now: { this.state.currentTime.toLocaleTimeString() }</Text>
      <Text style={mainStyles.text}>Your end time is: { this.state.endTime } </Text>
    </View>
    );
  }
}

class TimerScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require("./assets/img/smoke.png")}
        style={mainStyles.mainView}
      >
        <Text style={mainStyles.text}>Timer Screen</Text>
        <TouchableHighlight title="Play" onPress={() => playBell()}>
          <View>
            <Text style={mainStyles.text}>Play sound</Text>
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
    backgroundColor: "rgba(40, 40, 40, 0.85)",
    borderRadius: 5
  }, 
  text: {
    color: "#e8e8e8"
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
