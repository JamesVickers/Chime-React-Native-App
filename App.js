import React, { Component } from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import PropTypes from "prop-types";

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

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      isTimePickerVisible: false,
      chosenTime: ""
    };
  }

  tick() {
    if (this.state.currentTime.toLocaleTimeString() == this.state.chosenTime) {
      this.props.bellInClock(); //add parenteses to end of bellinclock to make it work
      console.log("time matches set time");
    }
    this.setState({
      currentTime: new Date()
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    //this.setEndTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  showPicker = () => this.setState({ isTimePickerVisible: true });

  hidePicker = () => this.setState({ isTimePickerVisible: false });

  handleTimePicked = time => {
    this.handleInputValue(time);
  };

  handleInputValue = x => {
    this.setState({
      isTimePickerVisible: false,
      chosenTime: moment(x)
        .format("HH:mm:ss")
        .toString()
    });
  };

  render() {
    return (
      <View>
        <Text style={mainStyles.text}>
          The time is now: {this.state.currentTime.toLocaleTimeString()}
        </Text>
        <Text style={{ color: "red" }}>{this.state.chosenTime}</Text>
        <TouchableOpacity onPress={this.showPicker} style={mainStyles.picker}>
          <Text>Show Time Picker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hidePicker}
          mode={"time"}
        />
      </View>
    );
  }
}

Clock.propTypes = {
  bellInClock: PropTypes.func
};

class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: "bell1"
    };
  }
 
  //must type react-native link react-native-sound in command line

  

  playBell = () => {
     
      console.log(this.state.eventTitle);

    let Sound = require("react-native-sound");
    Sound.setCategory("Playback");
    let bell = new Sound(`${this.state.eventTitle}.wav`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
      } else {
        console.log("duration in seconds: " + bell.getDuration());
        bell.play(success => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
      }
    });
  };

  
  setBell = (x) => {
    this.setState({
      eventTitle: x
    });
    this.playBell()
  }

  /*
  componentDidMount() {
    playBell();
  }
  */

  render() {
    return (
      <ImageBackground
        source={require("./assets/img/smoke.png")}
        style={mainStyles.mainView}
      >
        <Text style={mainStyles.text}>Timer Screen</Text>
        <Button title="bell1" onPress={() => {this.setBell("bell1")}} />
        <Button title="bell2" onPress={() => {this.setBell("bell2")}} />
        <Button title="bell3" onPress={() => {this.setBell("bell3")}} />
        <Clock bellInClock={this.playBell} />
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
  },
  picker: {
    backgroundColor: "green",
    color: "yellow"
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
