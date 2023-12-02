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

export default function StateMap() {
  const { state, dispatch } = useContext(GlobalContext);
  const currentStateMapData = state[state.length-1].mapData[state[state.length - 1].currentState];
  const [centerCoordinates, setCenterCoordinates] = useState<Array<number>>([]);
  const [zoom, setZoom] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
  };

  useEffect(() => {
    if (currentStateMapData) {
      setCenterCoordinates(currentStateMapData.centerCoordinates);
      setZoom(currentStateMapData.zoom);
      setLoading(false);
    }
  }, [currentStateMapData])

  return (
      <div className="StateMap">
        { !loading && <>
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
        </>}
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
