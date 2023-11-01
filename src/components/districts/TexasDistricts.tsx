import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { TexasDistricts } from "../../GeoJson/Texas_US_House_Districts";
import { fetchTexasDistrict } from "../apiClient";
import { Polygon } from "react-leaflet";

export default () => {

  interface MyComponentState {
    data: any | null; // Adjust the type based on your actual data structure
  }

  const [TexasDistricts, setTexasDistrict] = useState<MyComponentState['data']>([]);
  const generateColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };

  useEffect(() => {
    async function fetchDistrictsAsync() {
      try {
        const result = await fetchTexasDistrict();
        setTexasDistrict(result);
        console.log(result);
      } catch (error) {
        // Handle any errors here
      }
    }

    fetchDistrictsAsync();
  }, []);
  return (
    <>
      {
      TexasDistricts.map((district: { geometry: { coordinates: number[][][][]; }; }) => {
        return (
          <Polygon
            pathOptions={{
              fillColor: "#4287f5",
              fillOpacity: 0.5,
              weight: 2,
              opacity: 1,
              color: "white",
            }}
            positions={district.geometry.coordinates[0].map((items: number[][]) =>
              items.map((items: number[]) => {
                const coordinates: LatLngTuple = [items[1], items[0]];
                return coordinates;
              })
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
      })
      }
    </>
  );
};
