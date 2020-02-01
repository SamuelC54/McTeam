import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import styled from 'styled-components';
import firebase from 'firebase';
import tinygradient from 'tinygradient';
import Dialog from '@material-ui/core/Dialog';

import mobilierUrbainGP from '../mobilierurbaingp.json';

const THRASH_SIZE = 16; // cm;

const data = {
  datasets: [
    {
      label: 'Thrash level over time',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(248,50,47,0.4)',
      borderColor: 'rgba(248,50,47,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(248,50,47,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(248,50,47,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 1
    }
  ]
};

const ACCESS_TOKEN =
  'pk.eyJ1Ijoic2FtdWVsdHNvIiwiYSI6ImNrNWs3Z2s3YjBiN3Mza241MTkweDNsemEifQ.HAKopF1Q8laHm4hK6NR51A';

const ReactMapboxGlMap = ReactMapboxGl({ accessToken: ACCESS_TOKEN });

firebase.initializeApp({
  apiKey: 'AIzaSyAjyJ-T2RiCOJSFBHEDN3kpBQT3wM39XqY',
  authDomain: 'clean-d5b63.firebaseapp.com',
  databaseURL: 'https://clean-d5b63.firebaseio.com',
  projectId: 'clean-d5b63',
  storageBucket: 'clean-d5b63.appspot.com',
  messagingSenderId: '760378273796',
  appId: '1:760378273796:web:25c6a75c3fdafbabf98551'
});
const firestore = firebase.firestore();

const POLY_LONG = -73.613097;
const POLY_LAT = 45.505181;
const BOX_SIZE = 0.015;

var colorStops = [' #48BB78', ' #ECC94B', ' #f56565'];

var gradient = tinygradient(colorStops);
var colors = gradient.rgb(101);

export const Map = () => {
  const [polyTrashData, setPolyTrashData] = useState([]);
  const [montrealTrashData, setMontrealTrashData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [directionData, setDirectionData] = useState([]);

  useEffect(() => {
    firestore
      .collection('database')
      .doc('app')
      .onSnapshot(doc => {
        const newData = doc.data();
        const thrashData = _.filter(newData.sensor, data => data < 400);

        if (newData) {
          setPolyTrashData(thrashData);
        }
      });
  }, []);

  useEffect(() => {
    const newMontrealTrashData = mobilierUrbainGP.features
      .filter(feature => feature.properties.Element === 'POU')
      .filter(feature => {
        const featureLong = feature.properties.Long;
        const featureLat = feature.properties.Lat;

        return (
          featureLong < POLY_LONG + BOX_SIZE &&
          featureLong > POLY_LONG - BOX_SIZE &&
          featureLat < POLY_LAT + BOX_SIZE &&
          featureLat > POLY_LAT - BOX_SIZE
        );
      })
      .map(feature => ({
        ...feature.properties,
        fullness: Math.floor(Math.random() * 101)
      }));

    setMontrealTrashData(newMontrealTrashData);
  }, []);

  const labels = [];
  for (let i = 0; i < 300; i++) {
    labels.push(i);
  }

  data.labels = labels;

  const currentHeight = polyTrashData[0];
  console.log('currentHeight', currentHeight, 'cm');

  const last5minData = _.map(polyTrashData.slice(0, 299), d => {
    return (THRASH_SIZE - d) / THRASH_SIZE;
  });

  data.datasets[0].data = last5minData;

  const currentPercentage = Math.max(0, Math.round(last5minData[0] * 100));
  useEffect(() => {
    let coordinatesString = '';

    for (let trash of montrealTrashData.slice(0, 24)) {
      coordinatesString += trash.Long + ',';
      coordinatesString += trash.Lat + ';';
    }
    coordinatesString = coordinatesString.substring(
      0,
      coordinatesString.length - 1
    );

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}?geometries=geojson&access_token=${ACCESS_TOKEN}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      res.json().then(resJson => {
        setDirectionData(resJson);
        console.log('resJson', resJson);
      });
    });
  }, [montrealTrashData]);

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Line data={data} />
        <Percentage>{`Current percentage: ${currentPercentage} %`}</Percentage>
      </Dialog>
      <ReactMapboxGlMap
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        center={[POLY_LONG, POLY_LAT]}
        zoom={[13]}
      >
        <TrashMarker
          handleOpen={handleOpen}
          coordinates={[POLY_LONG, POLY_LAT]}
          color={colors[currentPercentage]}
          text={`${currentPercentage}%`}
        />
        {montrealTrashData.map(trash => (
          <TrashMarker
            handleOpen={handleOpen}
            key={trash.OBJECTID}
            coordinates={[trash.Long, trash.Lat]}
            color={colors[trash.fullness]}
            text={`${trash.fullness}%`}
          />
        ))}
      </ReactMapboxGlMap>
    </>
  );
};

const TrashMarker = props => {
  return (
    <Marker coordinates={props.coordinates} anchor="center">
      <div onClick={props.handleOpen}>
        <Dot color={props.color}>{props.text || ''}</Dot>
      </div>
    </Marker>
  );
};

const Dot = styled.div`
  font-family: Inter;

  font-size: 8px;
  line-height: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  border: ${props => `5px solid ${props.color}`};
`;

const Percentage = styled.p`
  padding-left: 8px;
  font-weight: bold;
`;
