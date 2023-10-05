import React, { useState, useContext, useEffect } from "react";
import { NevadaDistrictContext } from "../NevadaContext";
import "./css/Distance.css";
import "./css/StateMap.css"
import StateMap from "../components/StateMap";
import Navbar from "../components/Navbar";
import { NevadaDistrictProvider } from "../NevadaContext";
import DistanceTable from "./DistanceTable";

function Distance() {
  const [selectedState, setSelectedState] = useState("Nevada");
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [districtCoordinates, setDistrictCoordinates] = useState<Array<number>>(
    [38.5, -116.5]
  );

  const { state, dispatch } = useContext(NevadaDistrictContext);

  useEffect(() => {
    dispatch({
        type: "DISTRICT_MAP",
        payload: {
          dismap: true,
        },
      });
  },[]);

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
    <NevadaDistrictProvider>
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
    </NevadaDistrictProvider>
  );
}

export default Distance;
