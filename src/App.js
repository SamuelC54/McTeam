import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import Dialog from '@material-ui/core/Dialog';
import './App.css';
import ImageTemperature from './components/assets/temperature.png';
import ImageHumidity from './components/assets/humidity.svg';
import ImageLight from './components/assets/light.png';
import ArrowDown from './components/assets/down.gif';

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

  function handleLightToggle(){
    setLight(!light);
    console.log(light);

  }

 
  
  // humidity
  function handleHumidChange(e,value){
    setTargetHumid(value);
    setFireStoreHumid(value);
  }

  const [targetHumid, setTargetHumid] = useState(0);
  useEffect(() => {
    const targetHumid = firestore
    .collection("config")
    .doc("sensors")
    .get().then((doc)=>{
      setTargetHumid(doc.data().humiditySensor);
    });
  }, []);

  const setFireStoreHumid = (value) => {
    firestore
    .collection("config")
    .doc("sensors")
    .update({humiditySensor: value});
  }


  // temperature 
  function handleTempChange(e,value){
    setTargetTemp(value);
    setFireStoreTemp(value);
  }

  const [targetTemp, setTargetTemp] = useState(0);
  useEffect(() => {
    const tempTarget = firestore
    .collection("config")
    .doc("sensors")
    .get().then((doc)=>{
      setTargetTemp(doc.data().tempSensor);
    });
  }, []);

  const [openDialog, setOpenDialog] = useState(null);
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

  const closeDialog = () => {
    setOpenDialog(null);
  } 
  const setFireStoreTemp = (value) => {
    firestore
    .collection("config")
    .doc("sensors")
    .update({tempSensor: value});
  }


  
  return (
    <>
    <BigParent>
    <Dialog onClose={closeDialog} open={openDialog && openDialog === 'temperature'} fullWidth>
      <Chart label="Temperature level over time" color="#f8322f" data={temperature} lowerLimit={-50} upperLimit={50}/>
    </Dialog>
    <Dialog onClose={closeDialog} open={openDialog && openDialog === 'humidity'} fullWidth>
      <Chart label="Humidity level over time" color="#00Ff00" data={humidity} lowerLimit={0} upperLimit={100}/>
    </Dialog>
    <div className="App">
      <Camera>
        <Video/>
      </Camera>
      <LightBulb
        light={light}
        onClick={handleLightToggle}
        src={ImageLight}
      />
      <OneLineContainer>
      <OneLine>
        <OneLineChild>
          <Picture src={ImageHumidity} />
        </OneLineChild>
        <OneLineChild>
          <OneLineGrandChild>Actual</OneLineGrandChild>
          <OneLineGrandChild onClick={()=>setOpenDialog('humidity')}>
          <PictureInline src={ArrowDown} />{humidity && humidity[0]}%</OneLineGrandChild>
          <OneLineGrandChild>Target</OneLineGrandChild>
          <OneLineGrandChild>{targetHumid}%</OneLineGrandChild>
        </OneLineChild>


        <OneLineChild >
          <Typography id="discrete-slider" gutterBottom>
          Humidity
          </Typography>
          <Slider
            defaultValue={targetHumid}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={-4}
            max={25}
            onChangeCommitted={handleHumidChange}
          />  
        
          </OneLineChild>
      </OneLine>
      <OneLine>
        <OneLineChild>
          <Picture src={ImageTemperature} />
        </OneLineChild>
        <OneLineChild>
          <OneLineGrandChild>Actual</OneLineGrandChild>
          <OneLineGrandChild onClick={()=>setOpenDialog('temperature')}>
          <PictureInline src={ArrowDown} />{temperature && temperature[0]}°C</OneLineGrandChild>
          <OneLineGrandChild>Target</OneLineGrandChild>
          <OneLineGrandChild>{targetTemp}°C</OneLineGrandChild>
        </OneLineChild>


        <OneLineChild >
          <Typography id="discrete-slider" gutterBottom>
          Temperature
          </Typography>
          <Slider
            defaultValue={targetTemp}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={-4}
            max={25}
            onChangeCommitted={handleTempChange}
          />  
        
          </OneLineChild>
      </OneLine>
      </OneLineContainer>
    </div>
    </BigParent>
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
  width: 40px;
`;

const PictureInline = styled(Picture)`
  display: inline-block;
  transform: rotate(180deg);
`;

const Spacer = styled.div`
boder: 1 solid grey;
`;

const OneLine = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  border: 1px solid #e2e8f0;
`;

const OneLineChild = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const OneLineGrandChild = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
display: inline-block;

`;



const LightBulb = styled.img`
  width: 50px;
  position: absolute;
  index: 99999;
  top: 10px;
  left: 10px;
  background-color: ${props => (props.light ? 'yellow' : '#a0aec0')};
  border-radius: 9999px;
`;

const BigParent = styled.div`
  height: 100vh;
`;


const OneLineContainer = styled.div`
height: 50vh;

display:flex;
flex-direction: column;
justify-content: space-around;
align-items: stretch;
align-content: stretch;
`;