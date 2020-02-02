import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './App.css';
import ImageTemperature from './components/assets/temperature.png';
import ImageHumidity from './components/assets/humidity.svg';
import ImageLight from './components/assets/light.png';
import Video from './components/Video';

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

  return (
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

      <div>
        <input placeholder="Humidity" />
      </div>
      <OneLine>
        <OneLineChild>
          <Picture src={ImageHumidity} />
        </OneLineChild>
        <OneLineChild>{humidity && humidity[0]}%</OneLineChild>
        <OneLineChild>
          <Input placeholder="Humidity" />
        </OneLineChild>
      </OneLine>
      <OneLine>
        <OneLineChild>
          <Picture src={ImageTemperature} />
        </OneLineChild>
        <OneLineChild>{temperature && temperature[0]}°C</OneLineChild>
        <OneLineChild>
          <Input placeholder="Temperature" />
        </OneLineChild>
      </OneLine>
    </div>
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
