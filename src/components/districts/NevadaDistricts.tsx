import React from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { nevadaSA } from "../../GeoJson/Nevada_State_Assembly";

import { Polygon } from "react-leaflet";

export default () => {
  const generateColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };
  return (
    <>
      {nevadaSA.geometries.map((district) => {
        return (
          <Polygon
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.5,
              weight: 2,
              opacity: 1,
              color: "white",
            }}
            positions={district.coordinates[0].map((items) => {
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
      })}
    </>
  );
};
