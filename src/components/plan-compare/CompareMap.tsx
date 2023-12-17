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
import { DistrictState } from "../interfaces/MapInterface";
import DistrictPlan from "../districts/DistrictPlan";
import { fetchDistrictPlan } from "../apiClient";
import { useParams } from "react-router-dom";

export default function Map(props: {
  centerCoordinates: Array<number>;
  zoom: number;
  sliderValue: number;
}) {
  const [centerCoordinates, setCenterCoordinates] = useState(
    props.centerCoordinates
  );
  const [zoom, setZoom] = useState(props.zoom);
  const { state, dispatch } = useContext(GlobalContext);
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);

  const { stateName, planId } = useParams<{stateName : AvailableStates, planId : string }>();

  const currentState = stateName || AvailableStates.Unselected;

  const CurrentDistrictPlan = (props: { opacity: number }) => {
    switch (currentState) {
      case AvailableStates.Nevada:
        return <NevadaDistricts opacity={props.opacity} />;
      case AvailableStates.Virginia:
        return <VirginiaDistricts opacity={props.opacity} />;
      case AvailableStates.Texas:
        return <TexasDistricts opacity={props.opacity} />;
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
  let opacity1: number;
  let opacity2: number;

  if (props.sliderValue < 0.5) {
    opacity1 = 1;
    opacity2 = 2 * props.sliderValue;
  } else {
    opacity1 = 2 * (1 - props.sliderValue);
    opacity2 = 1;
  }
  setOpacity1(opacity1);
  setOpacity2(opacity2);
  },[props.sliderValue])


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
        <DistrictPlan opacity={opacity1} strokeColor={"#000080"} color={"#00388c"} planId={"ORIGINAL"} />
        <DistrictPlan opacity={opacity2} strokeColor={"#FFFF00"} color={"#00388c"} planId={planId || "-1"} />
        <SetMapView />
      </MapContainer>
    </div>
  );
}
