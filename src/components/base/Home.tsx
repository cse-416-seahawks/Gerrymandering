import React, { useState, useContext } from "react";
import { GlobalContext, GlobalProvider, AvailableStates } from "../../globalContext";
import "../../App.css";
import StateMap from "../statemap/StateMap";
import Navbar from "./Navbar";
import TableData from "../tables/TableData";


function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [districtCoordinates, setDistrictCoordinates] = useState<Array<number>>([38.5, -116.5]);

  const {state, dispatch} = useContext(GlobalContext);
  
  
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
            <StateMap selectedState={state[state.length-1].currentState} districtCoordinates={districtCoordinates} selectedDistrict={selectedDistrict}/>
            </div>
            <TableData selectedState={state[state.length-1].currentState} onDistrictSelection={handleDistrictSelection}/>
        </header>
      </div>
      </GlobalProvider>
      </div>
    </div>
  );
}

export default Home;