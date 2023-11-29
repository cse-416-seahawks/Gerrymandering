import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon } from "react-leaflet";
import { AvailableStates } from "../../globalContext";
import { fetchDistricts } from "../apiClient";
import { DistrictState } from "../interfaces/MapInterface";

export default () => {
  const [nevadaDistrict, setNevadaDistrict] = useState<DistrictState["data"]>(null);

  function getRandomHexCode(): string {
    const colors = ["#FF0000", "#0000FF"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  useEffect(() => {
    async function fetchDistrictsAsync() {
      try {
        const result = await fetchDistricts(AvailableStates.Nevada);
        setNevadaDistrict(result);
      } catch (error) {
        throw error;
      }
    }
    fetchDistrictsAsync();
  }, []);
  return (
    <>
      {nevadaDistrict && (
        nevadaDistrict.features.map((district: any) => {
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
