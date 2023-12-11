import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { Polygon } from "react-leaflet";
import { DistrictState } from "../interfaces/MapInterface";
import { fetchDistrictPlan } from "../apiClient";
import { GlobalContext } from "../../globalContext";

interface DistrictPlanProps {
  planId: string;
  opacity : number;
}
export default ({ planId, opacity }: DistrictPlanProps) => {
  const [plan, setPlan] = useState<DistrictState["data"]>(null);
  const { state, dispatch } = useContext(GlobalContext);
  const [districtColor, setColor] = useState(getRandomHexColor());
  const [isCurPlan, setIsCurPlan] = useState(planId === "000000");
  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        console.log('fetching ',state[state.length - 1].currentState, ' Plan #', planId)
        const result = await fetchDistrictPlan(
          state[state.length - 1].currentState,
          planId
        );
        console.log('fetched', planId)
        if (result) {
          setPlan(result);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchDistrictPlanAsync();
  }, []);

  function getRandomHexColor(): string {
    // Brightness threshold (adjust as needed)
    const brightnessThreshold = 150;

    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Calculate brightness using the formula: 0.299*R + 0.587*G + 0.114*B
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    // Check if the brightness is above the threshold
    if (brightness > brightnessThreshold) {
      // If too bright, generate a new color recursively
      return getRandomHexColor();
    }

    // Convert RGB to hex
    const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)}`;

    return hexColor;
  }
  return (
    <>
      {plan &&
        plan.features.map((district: any) => {
          return (
            <Polygon
              pathOptions={{
                fillColor: isCurPlan ? "#00388c" : districtColor,
                fillOpacity: opacity,
                weight: 2,
                opacity: opacity,
                color: isCurPlan ? "white" : "black",
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
