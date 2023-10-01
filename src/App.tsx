import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader"
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "./components/TableData";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Router>
        {/* <Sidebar /> */}
        <AppHeader/>
        <StateMap />
        <TableData/>
      </Router>
      </div>
    </div>
  );
}

export default App;
