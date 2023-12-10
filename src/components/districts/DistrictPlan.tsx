import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon } from "react-leaflet";
import { DistrictState } from "../interfaces/MapInterface";

interface DistrictPlanProps {
  geoDataFrame: DistrictState["data"];
}
export default ({ geoDataFrame }: DistrictPlanProps) => {

    console.log('rendering district plan');
  function getRandomHexColor(): string {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert RGB to hexadecimal
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");

    // Concatenate and return the color string
    return `#${hexR}${hexG}${hexB}`;
  }
  return (
    <>
      {geoDataFrame &&
        geoDataFrame.features.map((district: any) => {
          return (
            <Polygon
              pathOptions={{
                fillColor: getRandomHexColor(),
                fillOpacity: 0.5,
                weight: 2,
                opacity: 1,
                color: "white",
              }}
              positions={district.geometry.coordinates[0].map(
                (items: LatLngTuple[]) => [items[1], items[0]] as LatLngTuple[]
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
    </>
  );
};
