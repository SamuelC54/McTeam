import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import './App.css';
import ImageTemperature from './components/assets/temperature.png';
import ImageHumidity from './components/assets/humidity.svg';
import ImageLight from './components/assets/light.png';
import Video from './components/Video';
import Chart from './components/Chart';

firebase.initializeApp({
  apiKey: 'AIzaSyA4CuGhBhsOE2UkF2wpUQgqepxO9B6SWsQ',
  authDomain: 'mcteam-4e8fe.firebaseapp.com',
  databaseURL: 'https://mcteam-4e8fe.firebaseio.com',
  projectId: 'mcteam-4e8fe',
  storageBucket: 'mcteam-4e8fe.appspot.com',
  messagingSenderId: '935234732757',
  appId: '1:935234732757:web:44241121f0203b798d185c',
  measurementId: 'G-L4QNHNNDML'
});
const firestore = firebase.firestore();

function App() {
  const [humidity, setHumidity] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [light, setLight] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);
  useEffect(() => {
    firestore
      .collection('data')
      .doc('sensors')
      .onSnapshot(doc => {
        const newData = doc.data();
        console.log(newData);
        setTemperature(newData.tempSensor);
        setHumidity(newData.humiSensor);
      });
  }, []);

  const closeDialog = () => {
    setOpenDialog(null);
  } 
  return (
    <>
    <Dialog onClose={closeDialog} open={openDialog && openDialog === 'temperature'} fullWidth>
      <Chart label="Temperature level over time" color="#f8322f" data={temperature} lowerLimit={-50} upperLimit={50}/>
    </Dialog>
    <Dialog onClose={closeDialog} open={openDialog && openDialog === 'humidity'} fullWidth>
      <Chart label="Humidity level over time" color="#00Ff00" data={humidity} lowerLimit={0} upperLimit={100}/>
    </Dialog>
    <div className="App">
      <Camera>
        <Video />
      </Camera>
      <LightBulb
        light={light}
        onClick={() => {
          setLight(!light);
          console.log(light);
        }}
        src={ImageLight}
      />
      <OneLine>
        <OneLineChild>
          <Picture src={ImageHumidity} />
        </OneLineChild>
        <OneLineChild onClick={()=>setOpenDialog('humidity')}>{humidity && humidity[0]}%</OneLineChild>
        <OneLineChild>
          <Input placeholder="Humidity" />
        </OneLineChild>
      </OneLine>
      <OneLine>
        <OneLineChild >
          <Picture src={ImageTemperature} />
        </OneLineChild>
        <OneLineChild onClick={()=>setOpenDialog('temperature')}>{temperature && temperature[0]}°C</OneLineChild>
        <OneLineChild>
          <Input placeholder="Temperature" />
        </OneLineChild>
      </OneLine>
    </div>
    </>
  );
}

export default App;

const Camera = styled.div`
  background-color: green;
  height: 50vh;
`;

const Input = styled.input`
  border: 1px solid grey;
  width: 50px;
`;

const Picture = styled.img`
  width: 20px;
`;

const OneLine = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-around;
  width: 50vw;
`;

const OneLineChild = styled.div`
  margin-right: 10px;
`;

const LightBulb = styled.img`
  width: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${props => (props.light ? 'yellow' : 'green')};
  border-radius: 9999px;
`;
