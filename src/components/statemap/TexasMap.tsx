import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon } from "react-leaflet";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { fetchStateOutline } from "../apiClient";
import { useNavigate } from "react-router-dom";
import { MapState } from "../interfaces/MapInterface";

export default () => {
  const [texasOutline, setData] = useState<MapState["data"]>(null);
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({
      type : "CHANGE_STATE",
      payload : {
        currentState : AvailableStates.Texas
      }
    })
    navigate("/home");
  }

  useEffect(() => {
    async function fetchOutlineAsync() {
      try {
        const result = await fetchStateOutline(AvailableStates.Texas);
        setData(result);
      } catch (error) {}
    }

    fetchOutlineAsync();
  }, []);

  return (
    <>
      {texasOutline && (
        <Polygon
          pathOptions={{
            fillColor: "#00388c",
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
      )}
    </>
  );
};
