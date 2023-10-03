import React, { useState } from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Navbar from "./components/Navbar";
import AppHeader from "./components/AppHeader"
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "./components/TableData";


function App() {
  const [selectedState, setSelectedState] = useState('Nevada');
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [districtCoordinates, setDistrictCoordinates] = useState<Array<number>>([38.5, -116]);
  
  const handleStateChange = (state:string) => {
    setSelectedState(state);
  }
  
  const handleDistrictSelection = (district_num: number, coordinates: Array<number>) => {
    console.log("now in app", district_num)
    setSelectedDistrict(district_num);
    setDistrictCoordinates(coordinates);
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
            <StateMap selectedState={selectedState} districtCoordinates={districtCoordinates} selectedDistrict={selectedDistrict}/>
            {/* </div> */}
            {/* <div className="State-map stack-top">
              <StateSelection onStateSelect={handleStateChange}/>
            </div> */}
            <TableData onDistrictSelection={handleDistrictSelection}/>
        </header>
      </div>
      </Router>
      </div>
    </div>
  );
}

export default App;