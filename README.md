## Node.js Lego Dimensions Library

NOTE: This does not currently work for the Xbox version of the toypad. It will connect but no responses will be received. If someone manages to get it working, please let me know so I can make this more compatible.

### Requirements

[Node.js](https://nodejs.org) 12 or newer. Tested and developed on Node.js 12.18.1.

NOTE: Windows libUSB, Mac and Linux are untested after forking and updating to Node.js 12.

### Installation

```bash
git clone git@github.com:jeffreyrivor/node-ld
cd node-ld
npm install
```

### Windows libUSB setup (only if using LibUSBTransport)

The default transport is HIDTransport and works without a driver install.

Use Zadig to (In tools folder) to install the USB driver

1. Connect the ToyPad
1. Launch Zadig
1. Select Options > List All Devices
1. Use the dropdown to select `LEGO READER V2.10`
1. Click Install Driver
1. You may have to unplug and replug the portal for it to take effect
1. At this point, this library should connect to it via the LibUSBTransport

### Samples

See demo.js and toypadDemo.js in the samples folder for example usage.
