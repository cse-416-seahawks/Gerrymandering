import React, { useEffect, useMemo, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon } from "react-leaflet";
import { AvailableStates } from "../../globalContext";
import { DistrictState } from "../interfaces/MapInterface";
import { fetchCurrDistrictPlan } from "../apiClient";
import { useParams } from "react-router-dom";
import { updateCache } from "../cacheUtil";

export default (props: { opacity: number }) => {
  const [TexasDistricts, setTexasDistrict] =
    useState<DistrictState["data"]>(null);
  const { stateName } = useParams<{stateName : AvailableStates}>();

  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        const result = await fetchCurrDistrictPlan(AvailableStates.Texas);
        setTexasDistrict(result);
        updateCache("http://localhost:4000/getCurrentDistrictPlan/TEXAS", result);
      } catch (error) {

      }
    }
    fetchDistrictPlanAsync();
  }, [stateName]);

  const districtMap = useMemo(() => {
    return (
      TexasDistricts &&
      TexasDistricts.features.map((district: any, index: number) => {
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
      })
    );
  }, [TexasDistricts]);

  return <>{districtMap}</>;
};
