import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../globalContext";
import "../css/Distance.css";
import "../css/StateMap.css"
import StateMap from "../statemap/StateMap";
import Navbar from "../base/Navbar";
import { GlobalProvider } from "../../globalContext";
import DistanceTable from "./DistanceTable";

function Distance() {
  const [selectedState, setSelectedState] = useState("Nevada");
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [districtCoordinates, setDistrictCoordinates] = useState<Array<number>>(
    [38.5, -116.5]
  );

  const { state, dispatch } = useContext(GlobalContext);


  const handleStateChange = (state: string) => {
    setSelectedState(state);
  };

  const handleDistrictSelection = (
    district_num: number,
    coordinates: Array<number>
  ) => {
    setSelectedDistrict(district_num);
    setDistrictCoordinates(coordinates);
  };
  return (
    <GlobalProvider>
    <div className="Distance">
      <Navbar />
        <div className="StateMap-content">
          <header className="StateMap-header">
            <div className="State-map">
              <StateMap
                selectedState={selectedState}
                onStateSelection={handleStateChange}
                districtCoordinates={districtCoordinates}
                selectedDistrict={selectedDistrict}
              />
            </div>
            <DistanceTable/>
          </header>
        </div>
      
    </div>
    </GlobalProvider>
  );
}

export default Distance;
