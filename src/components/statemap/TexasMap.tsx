import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

import { Polygon } from "react-leaflet";
import { AvailableStates } from "../../globalContext";
import { fetchStateOutline } from "../apiClient";

export default (props : {
  onClick: () => void;
}) => {
  interface MapState {
    data: any | null; // Adjust the type based on your actual data structure
  }

  const [texasOutline, setData] = useState<MapState["data"]>(null);

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
            click: props.onClick
          }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};
