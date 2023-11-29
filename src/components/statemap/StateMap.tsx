import React, {
  useEffect,
  useContext,
  useState,
} from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Polygon, useMapEvent, useMap } from "react-leaflet";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TexasDistricts from "../districts/TexasDistricts";
import NevadaDistricts from "../districts/NevadaDistricts";
import VirginiaDistricts from "../districts/VirginiaDistricts";
import { GlobalContext, AvailableStates, GlobalProvider } from "../../globalContext";
import ClusterSummary from "../summary/ClusterSummary";
import MainInfoCard from "../infocards/MainInfoCard";
import { GeoJSON, GeoJSONFeature, StateData, StateZoomData } from "../interfaces/MapInterface";

const stateData: StateData = {
  NEVADA: [38.5, -116.5],
  TEXAS: [31.5, -99.9],
  VIRGINIA: [37.9, -79.5],
};
const stateZoomData: StateZoomData = {
  NEVADA: 6,
  TEXAS: 6,
  VIRGINIA: 7,
};

export default function StateMap(props: {
  selectedState: AvailableStates;
  centerCoordinates: Array<number>;
  selectedDistrict: number;
}) {
  const [centerCoordinates, setCenterCoordinates] = useState(stateData[props.selectedState]);
  const [zoom, setZoom] = useState(stateZoomData[props.selectedState]);
  const { state, dispatch } = useContext(GlobalContext);


  const SetMapView = () => {
    const map = useMap();
     useEffect(() => {
       map.setView([centerCoordinates[0], centerCoordinates[1]], zoom);
     }, [centerCoordinates[0], centerCoordinates[1]]);
     return null;
   }


  const handleStateChangeCoordinates = (event : SelectChangeEvent) => {
    const newState = event.target.value;
    let newCurrentState : AvailableStates;
    if(newState === AvailableStates.Nevada)
      newCurrentState = AvailableStates.Nevada;
    else if(newState === AvailableStates.Texas)
      newCurrentState = AvailableStates.Texas;
    else
      newCurrentState = AvailableStates.Virginia;

    dispatch({
      type : "CHANGE_STATE",
      payload : {
        currentState : newCurrentState
      }
    })
    dispatch({
      type : "STEP_CHANGE",
      payload : {
        step : 0
      }
    })
    dispatch({
      type : "STATE_MAP",
      payload : {
        dismap : false
      }
    })
    setCenterCoordinates(stateData[newState]);
    setZoom(stateZoomData[newState]);
  };

  const displayDistricts = () => {
    if(<NevadaDistricts/> && <TexasDistricts/> && <VirginiaDistricts/>){
      return true;
    }
    else{
      return false
    }
  }

  console.log(state[state.length - 1].currentState)


  return (
    <div className="StateMap">
      <>
        <MapContainer
          id="mapid"
          center={[centerCoordinates[0], centerCoordinates[1]]}
          zoom={6}
          scrollWheelZoom={false}
          className="State-map"
          style={{height : "125%"}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <NevadaDistricts/>
          <TexasDistricts/>
          <VirginiaDistricts/>
        

          <SetMapView />
        </MapContainer>
      </>
      <div className="State-map stack-top">
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 120 }}
            style={{
              backgroundColor: "white",
              width: "150px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={state[state.length - 1].currentState}
              onChange={handleStateChangeCoordinates}
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              <MenuItem value={"NEVADA"}>Nevada</MenuItem>
              <MenuItem value={"TEXAS"}>Texas</MenuItem>
              <MenuItem value={"VIRGINIA"}>Virginia</MenuItem>
            </Select>
          </FormControl>
        </div>
        <MainInfoCard/>
    </div>
  );
}
