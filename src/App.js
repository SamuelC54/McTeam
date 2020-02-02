import React from 'react';
import './App.css';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <Camera>
        Caméra here
      </Camera>
      <div>
        Fan level control
      </div>
      <div>
        Cam Meat Tofu
      </div>
      <div>
        90%
      </div>
      <div>
      35 degrees C
    </div>
    <div>
      <input placeholder="Humidity"/>  
    </div>
    <div>
      <input placeholder="Temperature"/>
    </div>

    </div>
  );
}

export default App;


const Camera = styled.div`
  background-color: green;
`