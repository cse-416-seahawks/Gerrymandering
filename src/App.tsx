import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Sidebar from "./components/Sidebar";
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Sidebar />
      <header className="State-header">
          <StateMap />
      </header>
      </Router>
      </div>
    </div>
  );
}

export default App;
