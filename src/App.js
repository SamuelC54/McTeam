import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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

  function handleLightToggle(){
    setLight(!light);
    console.log(light);

  }

 

  function handTempDragStop(e){
    console.log(e);
  }

 
  useEffect(() => {
    firestore
      .collection('data')
      .doc('sensors')
      .onSnapshot(doc => {
        const newData = doc.data();
        setTemperature(newData.tempSensor);
        setHumidity(newData.humiSensor);
      });
  }, []);

  return (
    <div className="App">
      <Camera>
       
      </Camera>
      <LightBulb
        light={light}
        onClick={handleLightToggle}
        src={ImageLight}
      />
      <OneLine>
        <OneLineChild>
          <Picture src={ImageHumidity} />
        </OneLineChild>
        <OneLineChild>{humidity && humidity[0]}%</OneLineChild>
        <OneLineChild>
            <div class="slidecontainer">
                <input type="range" defaultValue={0} />
            </div>
        </OneLineChild>
      </OneLine>
      <OneLine>
        <OneLineChild>
          <Picture src={ImageTemperature} />
        </OneLineChild>
        <OneLineChild>{temperature && temperature[0]}°C</OneLineChild>
        <OneLineChild >
          <Typography id="discrete-slider" gutterBottom>
          Temperature
          </Typography>
          <Slider
            defaultValue={3}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={-4}
            max={25}
            onDragStop={()=>{console.log("stop")}}
          
          />  
        
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
  index: 99999;
  top: 10px;
  left: 10px;
  background-color: ${props => (props.light ? 'yellow' : 'grey')};
  border-radius: 9999px;
`;
