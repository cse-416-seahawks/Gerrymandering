import React, { useContext, useEffect, useState } from "react";
import { TileLayer, MapContainer, useMap } from "react-leaflet";
import NevadaMap from "../statemap/NevadaMap";
import TexasMap from "../statemap/TexasMap";
import VirginiaMap from "../statemap/VirginiaMap";
import 'leaflet/dist/leaflet.css'
import "../../App.css";
  
export default function Map(props: { centerCoordinates: Array<number>, zoom: number }) {
  const [centerCoordinates, setCenterCoordinates] = useState(props.centerCoordinates);
  const [zoom, setZoom] = useState(props.zoom);

  const SetMapView = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([centerCoordinates[0], centerCoordinates[1]], zoom);
    }, [centerCoordinates[0], centerCoordinates[1]]);
    return null;
  };

  return (
    <div>
      <MapContainer
        id="mapid"
        center={[centerCoordinates[0], centerCoordinates[1]]}
        zoom={6}
        className="State-Select"
        style={{width : "100%", height : "100vh"}}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <NevadaMap />
      <TexasMap />
      <VirginiaMap/>

      <SetMapView />
    </MapContainer>
    </div>
  );
}

