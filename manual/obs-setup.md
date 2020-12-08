# Set up live streaming with OBS Studio

[Home](../README.md) / setup

### 1. Run OBS Studio

![OBS Studio](pic1.png)

### 2. Scene

In the "Scenes" section add a new scene with an arbitrary name.

![New scene](pic2.png)

### 3. Sources

Click the scene you just created and in the "Sources" section add "Screen Capture (XSHM)" and "Audio Input Capture" items.

![Sources](pic3.png)

### 4. Settings

Click the "Settings" button.

![Settings](pic4.png)

Select the "Stream" item and configure:

- Service: `Custom`
- Server: `rtmp://localhost/live`
- Stream Key: `main`

![Stream](pic5.png)

Click "OK".
