import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { fetchStateOutline } from "../apiClient";
import { GlobalContext, AvailableStates } from "../../globalContext";
import { Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { MapState } from "../interfaces/MapInterface";

export default function NevadaMap() {
  const [nevadaOutline, setData] = useState<MapState["data"]>(null);
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({
      type: "CHANGE_STATE",
      payload: {
        currentState : AvailableStates.Nevada
      }
    });
    navigate("/home");
  }

  useEffect(() => {
    async function fetchOutlineAsync() {
      try {
        const result = await fetchStateOutline(AvailableStates.Nevada);
        setData(result);
      } catch (error) { console.log(error); }
    }
    fetchOutlineAsync();
  }, []);

  return (
    <>
      {nevadaOutline && (
        <Polygon
          pathOptions={{
            fillColor: "#002244",
            fillOpacity: 0.5,
            weight: 2,
            opacity: 1,
            color: "white",
          }}
          positions={nevadaOutline.features[0].geometry.coordinates[0].map(
            (items: number[]) => {
              const coordinates: LatLngTuple = [items[1], items[0]];
              return coordinates;
            }
          )}
          eventHandlers={{
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.7,
                weight: 2,
                color: "white",
              });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.5,
                weight: 2,
                color: "white",
              });
            },
            click: handleClick
          }}
        />
      )}
    </>
  );
};
