![React](https://github.com/ermondel/wiki/blob/master/files/icons48b/React48b.png)

# React Stream App

### About

Simple local streaming media player.

![React Stream App](https://github.com/ermondel/wiki/blob/master/screens/react-stream-app.jpg)

### Requirements

[OBS Studio](https://obsproject.com/) - free and open source software for video recording and live streaming.

### Installation

1. `git clone git@github.com:ermondel/react-stream-app.git`
2. `npm install`
3. `npm run build`
4. [Set up live streaming with OBS Studio](manual/obs-setup.md)

### Usage

1. `npm run start` («Ctrl+C» to stop)
2. [Start live streaming with OBS Studio](manual/obs-start.md)
3. Open [http://localhost:5000](http://localhost:5000)

| Technologies      |
| ----------------- |
| React             |
| axios             |
| flv.js            |
| node-media-server |
| concurrently      |
| serve             |
| webpack           |
