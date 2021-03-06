#!/usr/bin/env node

var iM880 = require('../iM880');

// set the endpoint ID
SERIAL_PORT = '/dev/ttyUSB1';
DEVICE_ID = 0x07;
DEVICE_GROUP = 0x10;
SF = 10;
BANDWIDTH = 125000;
ERROR_CODING = 4/5;
TX_PWR = 10;

// call the construction with and endpointID
device = new iM880(SERIAL_PORT, DEVICE_ID, DEVICE_GROUP, SF, BANDWIDTH, ERROR_CODING, TX_PWR);
// wait for config-done message and print endpointID
var msg = new Uint8Array([ 9, 8, 10, 67, 89, 100, 43 ]);
device.on('config-done', function(statusmsg) {
  // print the ID of the endpoint
  console.log('Configuration status: ' + statusmsg);
  // send a message
  //device.sendConfirmed(0x09, 0x10, msg);
  device.sendBroadcast(msg);
});

// listen for new messages and print them
device.on('rx-msg', function(data) {
  // print rx message without slip encoding or checksum
  console.log('Received message!!');
  console.log(data);
});

// listen for transmit done events
device.on('tx-msg-done', function(statusmsg) {
  // print out tx msg
  console.log('Tx-status: ' + statusmsg);
});
