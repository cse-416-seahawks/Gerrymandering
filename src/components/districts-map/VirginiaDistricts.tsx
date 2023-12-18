import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

import { Polygon } from "react-leaflet";
import { fetchCurrDistrictPlan } from "../apiClient";
import { AvailableStates } from "../../globalContext";
import { updateCache } from "../cacheUtil";
interface DistrictState {
  data: any | null;
}

export default function VirginiaDistricts(props: { opacity: number }) {
  const [virginiaHouse, setVirginiaHouse] =
    useState<DistrictState["data"]>(null);

  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        const result = await fetchCurrDistrictPlan(AvailableStates.Virginia);
        setVirginiaHouse(result);
        updateCache("http://localhost:4000/getCurrentDistrictPlan/VIRGINIA", result);
      } catch (error) {}
    }
    fetchDistrictPlanAsync();
  }, []);

  return (
    <>
      {virginiaHouse &&
        virginiaHouse.features.map((district: any,index : number) => {
          return (
            <Polygon
              key={index}
              pathOptions={{
                fillColor: "#00388c",
                fillOpacity: props.opacity,
                weight: 2,
                opacity: props.opacity,
                color: "white",
              }}
              positions={
                district.geometry.type === "MultiPolygon"
                  ? district.geometry.coordinates.map((polygon: any) =>
                      polygon.map((ring: any) =>
                        ring.map((coord: any) => [coord[1], coord[0]])
                      )
                    )
                  : district.geometry.coordinates.map((ring: any) =>
                      ring.map((coord: any) => [coord[1], coord[0]])
                    )
              }
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
}
