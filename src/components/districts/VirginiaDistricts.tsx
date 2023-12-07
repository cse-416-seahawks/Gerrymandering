import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

import { Polygon } from "react-leaflet";
import { fetchCurrDistrictPlan } from "../apiClient";
import { AvailableStates } from "../../globalContext";
interface DistrictState {
  data: any | null; 
}

export default function VirginiaDistricts () {
  const [virginiaHouse, setVirginiaHouse] = useState<DistrictState["data"]>(null);
  
  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        const result = await fetchCurrDistrictPlan(AvailableStates.Virginia);
        setVirginiaHouse(result);
      } catch (error) {}
    }
    fetchDistrictPlanAsync();
  }, []);

  return (
    <>
      {virginiaHouse && (
        virginiaHouse.features.map((district: any) => {
          return (
            <Polygon
              pathOptions={{
                fillColor: "#00388c",
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
        })
      )}
    </>
  );
};
