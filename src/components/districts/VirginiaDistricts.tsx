import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

import { Polygon } from "react-leaflet";
import { FeatureCollection } from "@turf/turf";
import { fetchDistricts } from "../apiClient";
import { AvailableStates } from "../../globalContext";

export default () => {
  interface DistrictState {
    data: any | null; // Adjust the type based on your actual data structure
  }

  const [virginiaHouse, setVirginiaHouse] =
    useState<DistrictState["data"]>(null);

  const generateColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };

  useEffect(() => {
    async function fetchDistrictsAsync() {
      try {
        const result = await fetchDistricts(AvailableStates.Virginia);
        setVirginiaHouse(result);
      } catch (error) {}
    }

    fetchDistrictsAsync();
  }, []);

  return (
    <>
      {virginiaHouse ? (
        virginiaHouse.features.map((district: any) => {
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
      ) : (
        <div></div>
      )}
    </>
  );
};
