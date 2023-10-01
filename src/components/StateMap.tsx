import React, {Component} from 'react'
import './StateMap.css'
import 'leaflet/dist/leaflet.css';
//import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet';
// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import {MongoClient, GridFSBucket} from 'mongodb';
import axios from 'axios';

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


function StateMap() {
  return (
    <div className='StateMap'>
      <div className="StateMap-Header-Text"><h1>Map</h1></div>
      
      <MapContainer id='mapid' center={[37.8, -96]} zoom={4} scrollWheelZoom={false}>
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {<GeoJSON data={nevadaData.features}/>}
      {/*<GeoJSON data={texasData.features}/>*/}
      <GeoJSON data={virginiaData.features}/>
      
      
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  )
}

export default StateMap;
