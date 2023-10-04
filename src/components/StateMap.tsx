import React, {
  Component,
  Context,
  useEffect,
  useContext,
  useState,
  createContext,
} from "react";
import "./css/StateMap.css";
import "leaflet/dist/leaflet.css";
import DistrictInfoCard from "./DistrictInfoCard";

import { MapContainer, TileLayer, Polygon, useMapEvent, useMap } from "react-leaflet";

// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import { MongoClient, GridFSBucket } from "mongodb";
import axios from "axios";
import VirginiaMap from "./State outlines/VirginiaMap";
import TexasMap from "./State outlines/TexasMap";
import NevadaMap from "./State outlines/NevadaMap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TexasDistricts from "./districts/TexasDistricts";
import NevadaDistricts from "./districts/NevadaDistricts";
import VirginiaDistricts from "./districts/VirginiaDistricts";
import { NevadaDistrictContext } from "../NevadaContext";

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}
interface GeoJSONFeature {
  type: string;
  properties: any;
  geometry: any;
}

interface StateData {
  [key: string]: [number, number];
}
interface StateZoomData {
  [key: string]: number;
}
const stateData: StateData = {
  Nevada: [38.5, -116.5],
  Texas: [31.5, -99.9],
  Virginia: [37.9, -79.5],
};
const stateZoomData: StateZoomData = {
  Nevada: 6,
  Texas: 6,
  Virginia: 6,
};

export default function StateMap(props: {
  selectedState: string;
  onStateSelection: (state: string) => void;
  districtCoordinates: Array<number>;
  selectedDistrict: number;
}) {
  const [centerCoordinates, setCenterCoordinates] = useState(
    props.districtCoordinates
  );
  const [currentState, setCurrentState] = useState("Nevada");

  const { state, dispatch } = useContext(NevadaDistrictContext);

  // function SetMapView() {
  //   console.log("setting map view", [
  //     centerCoordinates[0],
  //     centerCoordinates[1],
  //   ]);
  //   // const map = useMapEvent("mouseover", (e) => {
  //     map.setView([centerCoordinates[0], centerCoordinates[1]], stateZoomData[currentState]);
  //     // map.fitBounds(data.coordinates.getBounds());
  //     // map.setZoomAround([centerCoordinates[0], centerCoordinates[1]], 6);
  //   // });

  //   return null;
  // }
  const SetMapView = () => {
    const map = useMap();
     useEffect(() => {
       map.setView([centerCoordinates[0], centerCoordinates[1]]);
     }, [centerCoordinates[0], centerCoordinates[1]]);
     return null;
   }

  useEffect(() => {
    setCenterCoordinates(props.districtCoordinates);
  }, [props.districtCoordinates]);

  const handleStateChange = (event: SelectChangeEvent) => {
    setCenterCoordinates(stateData[event.target.value]);
    setCurrentState(event.target.value);
    props.onStateSelection(event.target.value)
  };

  {
    console.log("current state coords", centerCoordinates);
  }

  const getMapNevada = () =>  {
    console.log(state);
    return state[state.length - 1].dismap ? <NevadaDistricts/> : <NevadaMap/>
  }

  const getMapTexas = () =>  {
    console.log(state);
    return state[state.length - 1].dismap ? <TexasDistricts/> : <TexasMap/>
  }

  const getMapVirginia = () =>  {
    console.log(state);
    return state[state.length - 1].dismap ? <VirginiaDistricts/> : <VirginiaMap/>
  }
  return (
    <div className="StateMap">
      <>
        <MapContainer
          id="mapid"
          center={[centerCoordinates[0], centerCoordinates[1]]}
          zoom={6}
          scrollWheelZoom={false}
          className="State-map"
        >
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          {
            getMapTexas()
          }

          {
            getMapNevada()
          }

          {
            getMapVirginia()
          }

          <SetMapView />
        </MapContainer>
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
              value={currentState}
              onChange={handleStateChange}
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              <MenuItem value={"Nevada"}>Nevada</MenuItem>
              <MenuItem value={"Texas"}>Texas</MenuItem>
              <MenuItem value={"Virginia"}>Virginia</MenuItem>
            </Select>
          </FormControl>
        </div>
      </>
      <DistrictInfoCard currentState={currentState}/>
    </div>
  );
}
