import React, {Component} from 'react'
import './css/StateMap.css'
import 'leaflet/dist/leaflet.css';
//import L from 'leaflet';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvent} from 'react-leaflet';

// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import {MongoClient, GridFSBucket} from 'mongodb';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}
interface GeoJSONFeature {
  type: string;
  properties: any; 
  geometry: any;   
}
const state = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
};



var texasData : GeoJSON //= require("./../GeoJson/cb_2022_48_bg_500k.json");
var nevadaData = require("./../GeoJson/nv_2020_demcaucus.json");
var virginiaData = require("./../GeoJson/va_2019.json");

axios.get(`/Texas/${"cb_2022_48_bg_500k.json"}`, { responseType: 'blob' }).then((response) => {
  const blob = new Blob([response.data]);
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    if (typeof text === 'string') {
      try {
        const geoJSON = JSON.parse(text);
        nevadaData = geoJSON
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  };
  reader.readAsText(blob);
}).catch((error) => {
    console.error('Error downloading file:', error);
  });



interface StateData {
  [key: string]: [number, number]; 
}
const stateData: StateData = {
  Nevada: [38.5, -116],
  Texas: [32, -99.9],
  Virginia: [37.9, -78]
};

export default function StateMap(props: { selectedState: string }) {
  const [centerCoordinates, setCenterCoordinates] = React.useState(stateData['Nevada']);
  const [currentState, setCurrentState] = React.useState('Nevada');


  function SetMapView({ }) {
    console.log("e", [centerCoordinates[0], centerCoordinates[1]])
    const map = useMapEvent('mouseover', (e) => {
      map.setView([centerCoordinates[0], centerCoordinates[1]], map.getZoom(), {
      })
    })
  
    return null
  } 

  const handleStateChange = (event: SelectChangeEvent) => {

    setCenterCoordinates(stateData[event.target.value]);
    setCurrentState(event.target.value);
  };

  return (
    <div className='StateMap' >
        <>
          <MapContainer id='mapid' center={[38.5, -116]} zoom={6} scrollWheelZoom={false}>
              
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {<GeoJSON data={nevadaData.features}/>}
            {/*<GeoJSON data={texasData.features}/>*/}
            {<GeoJSON data={virginiaData.features}/>}
            <SetMapView/>
          </MapContainer>
          <div >
            <FormControl 
              variant="filled" 
              sx={{ m: 1, minWidth: 120 }} 
              style={{backgroundColor:"white", width:"150px", boxShadow:"0 3px 10px rgb(0 0 0 / 0.3)" }}
            >
              <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={currentState}
                onChange={handleStateChange}
                style={{fontWeight:"bold", fontSize:"18px"}}
              >
                

                <MenuItem value={"Nevada"}>Nevada</MenuItem>
                <MenuItem value={"Texas"}>Texas</MenuItem>
                <MenuItem value={"Virginia"}>Virginia</MenuItem>
              </Select>
            </FormControl>
          </div>
          </>
      </div>
  )
}
