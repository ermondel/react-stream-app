import React, { Component } from 'react';
import axios from 'axios';
import flv from 'flv.js';

class App extends Component {
  state = {
    mediaServerIsAvailable: false,
    progressBarMessage: '',
  };

  videoRef = React.createRef();
  videoPlayer = null;

  mediaServerBaseURL = 'http://localhost:8000';
  mediaServerStreamKey = 'main';

  get streamURL() {
    return `${this.mediaServerBaseURL}/live/${this.mediaServerStreamKey}.flv`;
  }

  pingMediaServer() {
    axios.get(this.mediaServerBaseURL).catch((error) => {
      if (!error.message.includes('Network Error') && this.videoPlayer) {
        this.setState({
          mediaServerIsAvailable: true,
          progressBarMessage: '',
        });

        this.videoPlayer.load();
      }
    });
  }

  progressBarActive() {
    if (!this.state.mediaServerIsAvailable) {
      this.setState({ progressBarMessage: 'Request to the media server ...' });

      this.pingMediaServer();

      setTimeout(() => this.progressBarStatic(), 5000);
    }
  }

  progressBarStatic() {
    if (!this.state.mediaServerIsAvailable) {
      this.setState({ progressBarMessage: 'The media server is not responding.' });

      setTimeout(() => this.progressBarActive(), 3000);
    }
  }

  componentDidMount() {
    this.videoPlayer = flv.createPlayer({ type: 'flv', url: this.streamURL });
    this.videoPlayer.attachMediaElement(this.videoRef.current);

    if (!this.state.mediaServerIsAvailable) {
      this.progressBarActive();
    }
  }

  render() {
    return (
      <div>
        <div>
          <video ref={this.videoRef} controls={true} />
        </div>
        <div>{this.state.progressBarMessage}</div>
      </div>
    );
  }
}

export default App;
