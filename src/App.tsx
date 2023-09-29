import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader"
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Sidebar />
      <div className="StateMap-Content">
      <AppHeader/>
      <header className="StateMap-header">
          <StateMap />
      </header>
      </div>
      </Router>
      </div>
    </div>
  );
}

export default App;
