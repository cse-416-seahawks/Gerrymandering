import React, { useContext, useEffect, useState } from "react";
import { TileLayer, MapContainer, useMap } from "react-leaflet";
import NevadaMap from "../state-map/NevadaMap";
import TexasMap from "../state-map/TexasMap";
import VirginiaMap from "../state-map/VirginiaMap";
import "leaflet/dist/leaflet.css";
import "../../App.css";
import { GlobalContext, AvailableStates } from "../../globalContext";
import NevadaDistricts from "../districts/NevadaDistricts";
import VirginiaDistricts from "../districts/VirginiaDistricts";
import TexasDistricts from "../districts/TexasDistricts";

export default function Map(props: {
  centerCoordinates: Array<number>;
  zoom: number;
}) {
  const [centerCoordinates, setCenterCoordinates] = useState(
    props.centerCoordinates
  );
  const [zoom, setZoom] = useState(props.zoom);
  const { state, dispatch } = useContext(GlobalContext);
  const [curPlan, setCurplan] = useState<AvailableStates>(
    state[state.length - 1].currentState
  );

  const CurrentDistrictPlan = () => {
    switch (curPlan) {
      case AvailableStates.Nevada:
        return <NevadaDistricts />;
      case AvailableStates.Virginia:
        return <VirginiaDistricts />;
      case AvailableStates.Texas:
        return <TexasDistricts />;
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
    setCurplan(state[state.length - 1].currentState);
  }, [state]);

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
        scrollWheelZoom={false}
        className="State-map"
        style={{ width: "100%", height: "45vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CurrentDistrictPlan />
        <SetMapView />
      </MapContainer>
    </div>
  );
}
