const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const firebase = require('firebase');
const port = new SerialPort('COM6', { baudRate: 115200 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

firebase.initializeApp({
  apiKey: "AIzaSyBCh0J7qIHN-xi6YSRa4f1IpifKgV0LnN4",
  authDomain: "mcteam2-61e71.firebaseapp.com",
  databaseURL: "https://mcteam2-61e71.firebaseio.com",
  projectId: "mcteam2-61e71",
  storageBucket: "mcteam2-61e71.appspot.com",
  messagingSenderId: "549984345149",
  appId: "1:549984345149:web:18f25fc2d654d680431e54",
  measurementId: "G-QW7P7PGZL5"
  });
  
let tempData = [];
let humidityData = [];
  const firestore = firebase.firestore();
  const dataCollection = firestore.collection('data').doc('sensors');
  let getDoc = dataCollection.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      let oldData = doc.data()
      tempData = oldData.tempSensor;
      humidityData = oldData.humiSensor;
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
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

