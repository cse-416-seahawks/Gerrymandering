import React, { Component, useEffect, useState } from "react";
import "./css/StateMap.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Polygon, useMapEvent } from "react-leaflet";

// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import { MongoClient, GridFSBucket } from "mongodb";
import axios from "axios";

import VirginiaMap from "./VirginiaMap";
import TexasMap from "./TexasMap";
import NevadaMap from "./NevadaMap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TexasDistricts from "./districts/TexasDistricts";
import NevadaDistricts from "./districts/NevadaDistricts";
import VirginiaDistricts from "./districts/VirginiaDistricts";



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
  Nevada: [38.5, -116],
  Texas: [31.5, -99.9],
  Virginia: [37.9, -79.5],
};
const stateZoomData: StateZoomData = {
  Nevada: 6,
  Texas: 6,
  Virginia: 6.5,
};

export default function StateMap(props: { selectedState: string, districtCoordinates: Array<number>, selectedDistrict: number }) {
  const [centerCoordinates, setCenterCoordinates] = useState(props.districtCoordinates);
  const [currentState, setCurrentState] = useState('Nevada');
  const [centerZoom, setCenterZoom] = useState(6);

  function SetMapView() {
    console.log("setting map view", [centerCoordinates[0], centerCoordinates[1]])
    const map = useMapEvent('mouseover', (e) => {
      map.setView([centerCoordinates[0], centerCoordinates[1]], centerZoom, {});
      // map.setZoomAround([centerCoordinates[0], centerCoordinates[1]], 6);
    });

    return null;
  }

  useEffect(() => {
    // setCenterCoordinates(props.districtCoordinates);
    // setCenterZoom(8);
  },[props.districtCoordinates])

  const handleStateChange = (event: SelectChangeEvent) => {
    setCenterCoordinates(stateData[event.target.value]);
    setCurrentState(event.target.value);
    setCenterZoom(stateZoomData[currentState]);
  };

  {console.log("current state coords", centerCoordinates)}
  return (
    <div className="StateMap">
      <>
        <MapContainer
          id="mapid"
          center={[38.5, -116]}
          zoom={6}
          scrollWheelZoom={false}
          className="State-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TexasDistricts />
          <NevadaDistricts/>
          <VirginiaDistricts/>

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
    </div>
  );
}
