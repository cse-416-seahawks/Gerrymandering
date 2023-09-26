import React from 'react'
import './StateMap.css'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";

const state = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
};

function StateMap() {
  return (
    <div>
      <h1>Map</h1>
      <MapContainer id='mapid' center={[37.8, -96]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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