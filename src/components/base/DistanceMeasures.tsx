import React, { useState, useContext  } from "react";
import { GlobalContext } from "../../globalContext";
import "../css/Distance.css";
import "../css/StateMap.css"
import "../../App.css";
import StateMap from "../statemap/StateMap";
import Navbar from "./Navbar";
import { GlobalProvider } from "../../globalContext";
import DistanceTable from "../tables/DistanceTable";

function Distance() {
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [centerCoordinates, setCenterCoordinates] = useState<Array<number>>(
    [38.5, -116.5]
  );

  const { state, dispatch } = useContext(GlobalContext);

  const handleDistrictSelection = (
    district_num: number,
    coordinates: Array<number>
  ) => {
    setSelectedDistrict(district_num);
    setCenterCoordinates(coordinates);
  };
  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar />
        <div className="StateMap-content">
          <header className="StateMap-header">
              <div className="State-map"> 
              <StateMap
                  selectedState={state[state.length - 1].currentState}
                  centerCoordinates={[38.5, -116.5]}
                  selectedDistrict={selectedDistrict}
                />
              </div>
              <DistanceTable/>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Distance;
