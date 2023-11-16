import React, { useContext, useEffect, useState } from "react";
import { TileLayer, MapContainer, useMap } from "react-leaflet";
import { GlobalContext, AvailableStates, GlobalProvider } from "../../globalContext";
import NevadaMap from "../statemap/NevadaMap";
import TexasMap from "../statemap/TexasMap";
import VirginiaMap from "../statemap/VirginiaMap";
import Navbar from "./Navbar";
import 'leaflet/dist/leaflet.css'
import { useNavigate } from "react-router-dom";
import "../../App.css";


  
export default function StateSelect(props: {
    centerCoordinates: Array<number>;
  }) {

  const [centerCoordinates, setCenterCoordinates] = useState(
    props.centerCoordinates
  );
  const [zoom, setZoom] = useState(5);

  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const selectVirginia = () => {
    console.log("SELECTING VIRGINIA")
    dispatch({
        type : "CHANGE_STATE",
        payload : {
          currentState : AvailableStates.Virginia
        }
      })
      navigate("/Home");
  }
  const selectNevada = () => {
    console.log("SELECTING NEVADA")
    dispatch({
        type : "CHANGE_STATE",
        payload : {
          currentState : AvailableStates.Nevada
        }
      })
      navigate("/Home");
  }
  const selectTexas = () => {
    console.log("SELECTING TEXAS")
    dispatch({
        type : "CHANGE_STATE",
        payload : {
          currentState : AvailableStates.Texas
        }
      })
      navigate("/Home");
      
  }

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
      <NevadaMap onClick={selectNevada} />
      <TexasMap onClick={selectTexas} />
      <VirginiaMap onClick={selectVirginia} />

      <SetMapView />
    </MapContainer>
    </div>
  );
}

