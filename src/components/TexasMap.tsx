import React from "react";
import "./css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { virginiaData, nevadaData, texasData } from "../StateData";

import { Polygon } from "react-leaflet";

export default () => (
  <Polygon
    pathOptions={{
      fillColor: "#FD8D3C",
      fillOpacity: 0.5,
      weight: 2,
      opacity: 1,
      color: "white",
    }}
    positions={texasData.features[0].geometry.coordinates[0].map((items) => {
      const coordinates: LatLngTuple = [items[1], items[0]];
      return coordinates;
    })}
  />
);
