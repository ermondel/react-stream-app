import React, { Component } from 'react';
import axios from 'axios';
import flv from 'flv.js';
import Logo from './assets/images/logo.png';

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
      <div className='app'>
        <main className='main'>
          <header className='header'>
            <img src={Logo} className='header__logo' alt='logo' />
            <h1 className='header__title'>React Stream App</h1>
          </header>
          <video ref={this.videoRef} controls={true} className='player' />
          <div className='progress-bar'>{this.state.progressBarMessage}</div>
        </main>
      </div>
    );
  }
}

export default App;
