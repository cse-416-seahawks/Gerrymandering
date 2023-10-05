import React from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { virginiaData, nevadaData, texasData } from "../../StateData";

import { Polygon } from "react-leaflet";


const getColor = () => {
  return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}



export default () => (
  <Polygon
    pathOptions={{
        fillColor : "#4287f5",
        fillOpacity : 0.5,
        weight : 2,
        opacity : 1,
        color : 'white',
    }}
    positions={virginiaData.features[0].geometry.coordinates.map((items) => {
      return items.map((items) =>
        items.map((items) => {
          const coordinates: LatLngTuple = [items[1], items[0]];
          return coordinates;
        })
      );
    })}
    eventHandlers={{
      mouseover : (e) => {
          const layer = e.target;
          layer.setStyle({
              fillOpacity : 0.7,
              weight : 2,
              color : "white"
          })
      },
      mouseout : (e) => {
          const layer = e.target;
          layer.setStyle({
              fillOpacity : 0.5,
              weight : 2,
              color : "white"
          })

      },
      click : (e) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity : 0.5,
          weight : 2,
          color : getColor()
      })
      }
    }}
  />
);
