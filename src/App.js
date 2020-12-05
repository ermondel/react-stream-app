import React, { Component } from 'react';
import axios from 'axios';
import flv from 'flv.js';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';

class App extends Component {
  state = {
    mediaServerIsAvailable: false,
    progressBarStatus: 'disabled', // disabled | request | notice
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
          progressBarStatus: 'disabled',
        });

        this.videoPlayer.load();
      }
    });
  }

  progressBarActive() {
    if (!this.state.mediaServerIsAvailable) {
      this.setState({ progressBarStatus: 'request' });
      this.pingMediaServer();
      setTimeout(() => this.progressBarStatic(), 5000);
    }
  }

  progressBarStatic() {
    if (!this.state.mediaServerIsAvailable) {
      this.setState({ progressBarStatus: 'notice' });
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
      <div className='app'>
        <main className='main'>
          <Header />

          <video ref={this.videoRef} controls={true} className='player' />

          <ProgressBar status={this.state.progressBarStatus} />
        </main>
      </div>
    );
  }
}

export default App;
