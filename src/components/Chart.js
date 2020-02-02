import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
    datasets: [
      {
        label: 'Temperature level over time',
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
const Chart = (props) => {
    data.datasets[0].label = props.label;
    const labels = [];
    for (let i = 0; i < 300; i++) {
        labels.push(i);
    }
    data.datasets[0].borderColor = props.color;
    data.datasets[0].pointBorderColor = props.color;
    data.datasets[0].pointHoverBackgroundColor = props.color;
    data.labels = labels;
    data.datasets[0].data = props.data;
    return (
        <Line data={data} options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: props.lowerLimit,
                  max: props.upperLimit
                }
              }
            ]
          }
        }}/>
    );
};

export default Chart;

