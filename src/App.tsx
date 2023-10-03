import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Navbar from "./components/Navbar";
import AppHeader from "./components/AppHeader"
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "./components/TableData";


function App() {
  const [selectedState, setSelectedState] = React.useState('Nevada');
  const [districtCoord, setDistrictCoord] = React.useState([]);
  const handleStateChange=(state:string)=>{
    setSelectedState(state);
  }
  const handleCoordChange=(coord:[])=>{
    setDistrictCoord(coord);
  }


  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Navbar />
      <div className="StateMap-content">
        <AppHeader/>
        <header className="StateMap-header">
            {/* <div className="State-map"> */}
            <StateMap selectedState={selectedState}/>
            {/* </div> */}
            {/* <div className="State-map stack-top">
              <StateSelection onStateSelect={handleStateChange}/>
            </div> */}
            <TableData /*onDistrictSelection={districtCoord}*//>
        </header>
      </div>
      </Router>
      </div>
    </div>
  );
}

export default App;