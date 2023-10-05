import React, { useState, useContext } from "react";
import { NevadaDistrictContext } from "../NevadaContext";
import "../App.css";
import StateMap from "../components/StateMap";
import Navbar from "../components/Navbar";
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "../components/TableData";
import DistrictInfoCard from "../components/DistrictInfoCard";
import { NevadaDistrictProvider } from "../NevadaContext";


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
      <NevadaDistrictProvider>
      <div className="StateMap-content">
        <header className="StateMap-header">
            <div className="State-map"> 
            <StateMap selectedState={selectedState} onStateSelection={handleStateChange} districtCoordinates={districtCoordinates} selectedDistrict={selectedDistrict}/>
            </div>
            <TableData selectedState={selectedState} onDistrictSelection={handleDistrictSelection}/>
        </header>
      </div>
      </NevadaDistrictProvider>
      </div>
    </div>
  );
}

export default Home;