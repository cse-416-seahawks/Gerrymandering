import React, { useState, useContext } from "react";
import { GlobalContext, GlobalProvider } from "../globalContext";
import "../App.css";
import StateMap from "./statemap/StateMap";
import Navbar from "./base/Navbar";
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "./tables/TableData";
import DistrictInfoCard from "./base/DistrictInfoCard";


function Home() {
  const [selectedState, setSelectedState] = useState('Nevada');
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [districtCoordinates, setDistrictCoordinates] = useState<Array<number>>([38.5, -116.5]);
  const [disMap, setDismap] = useState(false);
  
  const handleStateChange = (state:string) => {
    setSelectedState(state);
  }
  
  const handleDistrictSelection = (district_num: number, coordinates: Array<number>) => {
    console.log("now inhome", district_num)
    setSelectedDistrict(district_num);
    setDistrictCoordinates(coordinates);
  }

  

  return (
    <div className="Home">
      <div className="Home-content">
      <Navbar />
      <GlobalProvider>
      <div className="StateMap-content">
        <header className="StateMap-header">
            <div className="State-map"> 
            <StateMap selectedState={selectedState} onStateSelection={handleStateChange} districtCoordinates={districtCoordinates} selectedDistrict={selectedDistrict}/>
            </div>
            <TableData selectedState={selectedState} onDistrictSelection={handleDistrictSelection}/>
        </header>
      </div>
      </GlobalProvider>
      </div>
    </div>
  );
}

export default Home;