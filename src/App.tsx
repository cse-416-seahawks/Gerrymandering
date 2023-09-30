import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Sidebar from "./components/Sidebar";
import StateSelection from "./components/StateSelection"
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Sidebar />
      <header className="StateMap-header">
          <div className="State-map">
            <StateMap/>
          </div>
          <div className="State-map stack-top">
            <StateSelection/>
          </div>
      </header>
      </Router>
      </div>
    </div>
  );
}

export default App;