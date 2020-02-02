const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const firebase = require('firebase');
const port = new SerialPort('COM6', { baudRate: 115200 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

firebase.initializeApp({
  apiKey: "AIzaSyA4CuGhBhsOE2UkF2wpUQgqepxO9B6SWsQ",
  authDomain: "mcteam-4e8fe.firebaseapp.com",
  databaseURL: "https://mcteam-4e8fe.firebaseio.com",
  projectId: "mcteam-4e8fe",
  storageBucket: "mcteam-4e8fe.appspot.com",
  messagingSenderId: "935234732757",
  appId: "1:935234732757:web:44241121f0203b798d185c",
  measurementId: "G-L4QNHNNDML"
  });
  const firestore = firebase.firestore();
const tempData = [];
const humidityData = [];
// Read the port data

port.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
    const humidityValue = parseFloat(data.slice(0,5));
    const temperatureValue = parseFloat(data.slice(6,11));
    console.log('got word from arduino:', data);
    console.log('temperature value: ', temperatureValue);
    console.log('humidity value: ',humidityValue );
    tempData.unshift(temperatureValue);
    humidityData.unshift(humidityValue);
    firestore
      .collection("data")
      .doc("sensors")
      .update({tempSensor: tempData});
    firestore
      .collection("data")
      .doc("sensors")
      .update({humiSensor: humidityData})
      ;
});

