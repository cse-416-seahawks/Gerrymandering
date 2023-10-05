import React from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { virginiaHouse } from "../../GeoJson/Virginia_House";

import { Polygon } from "react-leaflet";

export default () => {
  const generateColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };
  return (
    <>
      {virginiaHouse.features.map((district) => {
        return (
          <Polygon
            pathOptions={{
              fillColor: "#4287f5",
              fillOpacity: 0.5,
              weight: 2,
              opacity: 1,
              color: "white",
            }}
            positions={district.geometry.coordinates[0].map(
              (items) => [items[1], items[0]] as LatLngTuple[]
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
            }}
          />
        );
      })}
    </>)
};
