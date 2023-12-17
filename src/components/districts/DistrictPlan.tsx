import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon } from "react-leaflet";
import { DistrictState } from "../interfaces/MapInterface";
import { fetchDistrictPlan } from "../apiClient";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useParams } from "react-router-dom";

interface DistrictPlanProps {
  planId: string;
  opacity: number;
  color : string;
  strokeColor : string;
  transparent? : boolean
}
export default ({ planId, opacity, color, strokeColor, transparent }: DistrictPlanProps) => {
  const [plan, setPlan] = useState<DistrictState["data"]>(null);
  const { state, dispatch } = useContext(GlobalContext);
  const [isCurPlan, setIsCurPlan] = useState(planId === "ORIGINAL");
  const { stateName } = useParams<{stateName : AvailableStates}>();

  const currentState = stateName || AvailableStates.Unselected;
  
  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        const result = await fetchDistrictPlan(
          currentState,
          planId
        );
        if (result) {
          setPlan(result);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchDistrictPlanAsync();
  }, []);

  return (
    <>
      {plan &&
        plan.features.map((district: any, index: number) => {
          return (
            <Polygon
              key={index}
              pathOptions={{
                fillColor: transparent ? "transparent" : color,
                fillOpacity: transparent ? 0.0 : 0.5,
                weight: 2,
                opacity: opacity,
                color: strokeColor,
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
            />
          );
        })}
    </>
  );
};
