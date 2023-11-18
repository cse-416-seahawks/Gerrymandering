import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

import { Polygon } from "react-leaflet";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { fetchStateOutline } from "../apiClient";
import { useNavigate } from "react-router-dom";

export default () => {
  interface MapState {
    data: any | null; // Adjust the type based on your actual data structure
  }

  const [texasOutline, setData] = useState<MapState["data"]>(null);

  const { state, dispatch } = useContext(GlobalContext);

  const [select, updateSelect] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({
      type : "CHANGE_STATE",
      payload : {
        currentState : AvailableStates.Texas
      }
    })
    updateSelect(true);
    console.log("changing current state", state)
    navigate("/Home");
  }

  useEffect(() => {
    async function fetchOutlineAsync() {
      try {
        const result = await fetchStateOutline(AvailableStates.Texas);
        setData(result);
        console.log("State outline Texas", result);
      } catch (error) {}
    }

    fetchOutlineAsync();
  }, []);

  return (
    <>
      {texasOutline ? (
        <Polygon
          pathOptions={{
            fillColor: "#4287f5",
            fillOpacity: 0.5,
            weight: 2,
            opacity: 1,
            color: "white",
          }}
          positions={texasOutline.features[0].geometry.coordinates[0].map(
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
      ) : (
        <div></div>
      )}
    </>
  );
};
