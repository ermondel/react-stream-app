import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    mediaServerIsAvailable: false,
    progressBarMessage: '',
  };

  pingMediaServer() {
    axios.get('http://localhost:8000').catch((error) => {
      if (!error.message.includes('Network Error')) {
        this.setState({ mediaServerIsAvailable: true });
      }
    });
  }

  progressBarActive() {
    if (!this.state.mediaServerIsAvailable) {
      this.setState({ progressBarMessage: 'animate' });

      this.pingMediaServer();

      setTimeout(() => this.progressBarStatic(), 8000);
    }
  }

  progressBarStatic() {
    if (!this.state.mediaServerIsAvailable) {
      this.setState({ progressBarMessage: 'static' });

      setTimeout(() => this.progressBarActive(), 8000);
    }
  }

  componentDidMount() {
    if (!this.state.mediaServerIsAvailable) {
      this.progressBarActive();
    }
  }

  render() {
    if (this.state.mediaServerIsAvailable) {
      return <div>Video Player</div>;
    } else {
      return <div>{this.state.progressBarMessage}</div>;
    }
  }
}

export default App;
