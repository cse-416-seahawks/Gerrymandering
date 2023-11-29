import React, { useEffect, useMemo, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { fetchCurrDistrictPlan } from "../apiClient";
import { Polygon } from "react-leaflet";
import { AvailableStates } from "../../globalContext";
import { DistrictState } from "../interfaces/MapInterface";

export default () => {
  const [TexasDistricts, setTexasDistrict] = useState<DistrictState["data"]>(null);
  
  function getRandomHexCode(): string {
    const colors = ["#FF0000", "#0000FF"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        const result = await fetchCurrDistrictPlan(AvailableStates.Texas);
        setTexasDistrict(result);
      } catch (error) {}
    }
    fetchDistrictPlanAsync();
  }, []);

  const districtMap = useMemo(() => {
    return TexasDistricts && 
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
    })
  }, [TexasDistricts]);

  return (
    <>
      {
        districtMap
      }
    </>
  );
};
