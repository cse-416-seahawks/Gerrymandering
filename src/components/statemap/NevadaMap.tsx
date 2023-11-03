import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { virginiaData, nevadaData, texasData } from "../../StateData";
import { fetchStateOutline } from "../apiClient";
import { GlobalContext, AvailableStates } from "../../globalContext";
import { Polygon } from "react-leaflet";

const getColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

export default () => {

  const [nevadaOutline, setData] = useState(nevadaData);

  useEffect(() => {
    async function fetchOutlineAsync() {
      try {
        const result = await fetchStateOutline(AvailableStates.Nevada);
        console.log("State outline", result);
      } catch (error) {
        // Handle any errors here
      }
    }

    fetchOutlineAsync();
  }, []);

  return (
    <Polygon
      pathOptions={{
        fillColor: "#4287f5",
        fillOpacity: 0.5,
        weight: 2,
        opacity: 1,
        color: "white",
      }}
      positions={nevadaOutline.features[0].geometry.coordinates[0].map((items) => {
        const coordinates: LatLngTuple = [items[1], items[0]];
        return coordinates;
      })}
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
      }}
    />
  );
};
