import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Sidebar from "./components/Sidebar";
import {BrowserRouter as Router} from 'react-router-dom'
import StateSelection from './components/StateSelection'

function App() {
  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Sidebar />
      <header className="State-header">
          <div className='map'>
          <StateMap />
        </div>
        <div className="state-selection">
          <StateSelection/>
        </div>
      </header>
      </Router>
      </div>
    </div>
  );
}

export default App;
