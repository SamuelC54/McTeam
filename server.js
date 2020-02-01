const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const firebase = require('firebase');
const port = new SerialPort('COM3', { baudRate: 115200 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

firebase.initializeApp({
    apiKey: "AIzaSyAjyJ-T2RiCOJSFBHEDN3kpBQT3wM39XqY",
    authDomain: "clean-d5b63.firebaseapp.com",
    databaseURL: "https://clean-d5b63.firebaseio.com",
    projectId: "clean-d5b63",
    storageBucket: "clean-d5b63.appspot.com",
    messagingSenderId: "760378273796",
    appId: "1:760378273796:web:25c6a75c3fdafbabf98551"
  });
  const firestore = firebase.firestore();
const arrayData = [];  
const errorLimit = 20;
// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
    if(data< errorLimit){
        arrayData.unshift(data);
          console.log('got word from arduino:', data);
          console.log(' data: ', data);
          firestore
          .collection("database")
          .doc("app")
          .update({
            sensor: arrayData
          });
    }else{
        console.log('Error: ',data)
    }

});