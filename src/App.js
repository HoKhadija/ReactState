import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    // Set initial state
    this.state = {
      person: {
        fullName: 'HONNIT Khadija',
        bio: 'Hardworking and dedicated, possessing a team-oriented mindset and a great ability to adapt. My first experiences have allowed me to strengthen my knowledge in the field of management control.',
        imgSrc: require("./MyPic.jpg"),
        profession: "Web Developer",
      },
      shows: true, // controls whether or not to show the profile
      timeInterval: 0, // tracks time since component mount
    };
  }

  componentDidMount() {
    this.startInterval(); // start the interval when the component mounts
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // clear the interval when the component unmounts
  }

  // Start the interval that updates the time interval
  startInterval = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timeInterval: prevState.timeInterval + 1,
      }));
    }, 1000); // update the interval every second
  };

  // Toggle the value of shows
  toggleShow = () => {
    this.setState((prevState) => ({ shows: !prevState.shows }));
    clearInterval(this.intervalId); // clear the interval when shows is toggled
    if (!this.state.shows) {
      this.setState({ timeInterval: 0 }); // reset timeInterval to zero when shows is true
      this.startInterval(); // restart the interval when shows is true
    }
  };

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.person;
    const { shows, timeInterval } = this.state;
    return (
      <div className='container'>
        <button onClick={this.toggleShow}>
          {shows ? "Hide Profile" : "Show Profile"}
        </button>

        {/* Only show the profile if shows is true */}
        {shows && (
          <div className="ShowProfile" >
            <div>
              <img src={imgSrc} alt={fullName} style={{ width: 250, height: 260 }} />
            </div>

            <div className="right">
              <h2>{fullName} - <span className="profession">{profession}</span></h2>
              <p>{bio}</p>
            </div>
          </div>
        )}
        <p>Time interval since mount: <span>{timeInterval} seconds</span></p>
      </div>
    );
  }
}
