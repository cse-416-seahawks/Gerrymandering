import React, { useEffect, useMemo, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { fetchDistricts } from "../apiClient";
import { Polygon } from "react-leaflet";
import { AvailableStates } from "../../globalContext";
import { Feature, FeatureCollection } from "@turf/turf";

export default () => {
  interface DistrictState {
    data: FeatureCollection | null; // Adjust the type based on your actual data structure
  }

  const [TexasDistricts, setTexasDistrict] =
    useState<DistrictState["data"]>(null);
  function getRandomHexCode(): string {
    // Array of possible colors
    const colors = ["#FF0000", "#0000FF"];

    // Randomly select a color index
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the selected color
    return colors[randomIndex];
  }

  useEffect(() => {
    async function fetchDistrictsAsync() {
      try {
        const result = await fetchDistricts(AvailableStates.Texas);
        setTexasDistrict(result);
      } catch (error) {}
    }

    fetchDistrictsAsync();
  }, []);

  const districtMap = useMemo(() => {
    return TexasDistricts ? 
     TexasDistricts.features.map((district: any) => {
      return (
        <Polygon
          pathOptions={{
            fillColor: getRandomHexCode(),
            fillOpacity: 0.5,
            weight: 2,
            opacity: 1,
            color: "white",
          }}
          positions={district.geometry.coordinates[0].map(
            (items: number[][]) =>
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
    } ) : null
  }, [TexasDistricts]);

  return (
    <>
      {
        districtMap
      }
    </>
  );
};
