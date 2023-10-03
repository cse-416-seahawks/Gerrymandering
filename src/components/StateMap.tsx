import React, { Component, useEffect } from "react";
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

// var texasData = require("./../GeoJson/cb_2022_48_bg_500k.json");
// var nevadaData = require("./../GeoJson/nv_2020_demcaucus.json");
// var virginiaData = require("./../GeoJson/va_2019.json");

// axios
//   .get(`/Texas/${"cb_2022_48_bg_500k.json"}`, { responseType: "blob" })
//   .then((response) => {
//     const blob = new Blob([response.data]);
//     const reader = new FileReader();
//     reader.onload = () => {
//       const text = reader.result;
//       if (typeof text === "string") {
//         try {
//           const geoJSON = JSON.parse(text);
//           nevadaData = geoJSON;
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//         }
//       }
//     };
//     reader.readAsText(blob);
//   })
//   .catch((error) => {
//     console.error("Error downloading file:", error);
//   });

// {/* {statesData.features.map((state) => {
//   let coordinates : LatLngTuple[] | LatLngTuple[][] = [];
//   console.log(typeof state.geometry.coordinates)
//   if (!Array.isArray(state.geometry.coordinates[0][0][0])) {
//       coordinates = state.geometry.coordinates[0].map((items) => {
//       const tuple : LatLngTuple = [items[1], items[0]];
//       return tuple;
//     });
//     return (
//       <Polygon
//         pathOptions={{
//           fillColor: "#FD8D3C",
//           fillOpacity: 0.7,
//           weight: 2,
//           opacity: 1,
//           dashArray: [3],
//           color: "white",
//         }}
//         positions={state.geometry.coordinates[0][0]}
//       />
//     );
//   }

// })} */}
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
export default function StateMap(props: { selectedState: string }) {
  const [centerCoordinates, setCenterCoordinates] = React.useState(
    stateData["Nevada"]
  );
  const [currentState, setCurrentState] = React.useState("Nevada");

  function SetMapView({}) {
    console.log("e", [centerCoordinates[0], centerCoordinates[1]]);
    const map = useMapEvent("mouseover", (e) => {
      map.setView(
        [centerCoordinates[0], centerCoordinates[1]],
        stateZoomData[currentState],
        {}
      );
      // map.setZoomAround([centerCoordinates[0], centerCoordinates[1]], 6);
    });

    return null;
  }

  const handleStateChange = (event: SelectChangeEvent) => {
    setCenterCoordinates(stateData[event.target.value]);
    setCurrentState(event.target.value);
  };

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
