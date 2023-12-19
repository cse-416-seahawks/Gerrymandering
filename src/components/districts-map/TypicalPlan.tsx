import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import { TileLayer, type LatLngTuple } from "leaflet";
import { MapContainer, Polygon, useMap } from "react-leaflet";
import { DistrictState } from "../interfaces/MapInterface";
import { fetchDistrictPlan, fetchTypicalPlan } from "../apiClient";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Grid } from "@mui/material";

interface DistrictPlanProps {
  clusterId: string;
  strokeColor?: string;
  transparent?: boolean;
}
export default ({ clusterId, strokeColor, transparent }: DistrictPlanProps) => {
  const [plan, setPlan] = useState<DistrictState["data"]>(null);
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName } = useParams<{ stateName: AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;

  useEffect(() => {
    async function fetchTypicalPlanAsync() {
      try {
        if (clusterId !== "") {
          const result = await fetchTypicalPlan(currentState, clusterId);
          if (result) {
            setPlan(result);
          }
        }
      } catch (error) {
        console.error("Error fetching typical plan:", error);
      }
    }

    fetchTypicalPlanAsync();
  }, []);
  return (
    <>
      {plan ? (
        plan.features.map((district: any, index: number) => {
          return (
            <Polygon
              key={index}
              pathOptions={{
                fillColor: transparent ? "transparent" : "#FFA500",
                fillOpacity: transparent ? 0.0 : 0.5,
                weight: 2,
                opacity: 0.5,
                color: strokeColor ? strokeColor : "white",
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
        })
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <Grid item>
            <Box>
              <CircularProgress />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};
