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
      <MapContainer id='mapid' center={[37.8, -96]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[37.4316, -78.6569]}>
        <Popup>
          Virginia
        </Popup>
      </Marker>
      <Marker position={[31.9686, -99.9018]}>
        <Popup>
          Texas
        </Popup>
      </Marker>
      <Marker position={[38.8026, -116.4194]}>
        <Popup>
          Nevada
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  )
}

export default StateMap;