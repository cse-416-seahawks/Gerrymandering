import React, { useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon, GeoJSON } from "react-leaflet";
import { AvailableStates } from "../../globalContext";
import { fetchCurrDistrictPlan } from "../apiClient";
import { DistrictState } from "../interfaces/MapInterface";

export default React.memo((props: { opacity: number }) => {
  const [nevadaDistrict, setNevadaDistrict] =
    useState<DistrictState["data"]>(null);

  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        if (nevadaDistrict === null) {
          console.log("fetching...");
          const result = await fetchCurrDistrictPlan(AvailableStates.Nevada);
          setNevadaDistrict(result);
          console.log('rendered!', result);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchDistrictPlanAsync();
  }, []);
  console.log("rendering Nevada");
  return (
    <>
      {nevadaDistrict &&
        nevadaDistrict.features.map((district: any) => {
          return (
            <Polygon
              pathOptions={{
                fillColor: "#00388c",
                fillOpacity: 0.7,
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
                    fillOpacity: props.opacity,
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
});
