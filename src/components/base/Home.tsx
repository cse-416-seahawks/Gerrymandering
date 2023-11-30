import React, { useState, useContext, useEffect } from "react";
import { GlobalContext, GlobalProvider, AvailableStates } from "../../globalContext";
import "../../App.css";
import StateMap from "../statemap/StateMap";
import Navbar from "./Navbar";
import TableData from "./ClusterAnalysis";
import { fetchMapData } from "../apiClient";

function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [centerCoordinates, setCenterCoordinates] = useState<Array<number>>([38.5, -116.5]);
  const {state, dispatch} = useContext(GlobalContext);
  
  const handleDistrictSelection = (district_num: number, coordinates: Array<number>) => {
    setSelectedDistrict(district_num);
    setCenterCoordinates(coordinates);
  }

  useEffect(() => {
    async function getMapData() {
      const response = await fetchMapData();
      if (response) {
        dispatch({
          type: "SET_MAP_DATA",
          payload: { mapData: response.stateMapData, districtPlanTypes: response.stateDistrictPlanType }
        })
      }
    }
    getMapData();
  }, []);

  

  return (
    <div className="Home">
      <div className="Home-content">
      <Navbar />
      <div className="StateMap-content">
          <header className="StateMap-header">
            <div className="State-map"> 
              <StateMap/>
            </div>
            <TableData selectedState={state[state.length-1].currentState} onDistrictSelection={handleDistrictSelection}/>
        </header>
        
      </div>
      
      
      </div>
    </div>
  );
}

export default Home;