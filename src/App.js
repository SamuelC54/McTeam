import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Canada311 from './components/Canada311';
import { Map } from './components/Map';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Canada311 />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
