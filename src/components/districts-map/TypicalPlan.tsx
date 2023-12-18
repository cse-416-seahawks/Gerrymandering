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
  color: string;
  strokeColor: string;
  transparent?: boolean;
}
export default ({
  clusterId,
  color,
  strokeColor,
  transparent,
}: DistrictPlanProps) => {
  const [plan, setPlan] = useState<DistrictState["data"]>(null);
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName } = useParams<{ stateName: AvailableStates }>();

  const currentState = stateName || AvailableStates.Unselected;

  const { centerCoordinates, zoom } =
    state[state.length - 1].mapData[currentState];

  useEffect(() => {
    async function fetchDistrictPlanAsync() {
      try {
        const result = await fetchTypicalPlan(currentState, clusterId);
        if (result) {
          setPlan(result);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchDistrictPlanAsync();
  }, []);

  const SetMapView = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([centerCoordinates[0], centerCoordinates[1]], zoom);
    }, [centerCoordinates[0], centerCoordinates[1]]);
    return null;
  };

  return (
    <>
      <MapContainer
        id="mapid"
        center={[centerCoordinates[0], centerCoordinates[1]]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="State-map"
        style={{ width: "100%", height: "70vh" }}
      >
        {plan ? (
          plan.features.map((district: any, index: number) => {
            return (
              <Polygon
                key={index}
                pathOptions={{
                  fillColor: "#00388c",
                  fillOpacity: 0.5,
                  weight: 2,
                  opacity: 0.5,
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
        <SetMapView />
      </MapContainer>
    </>
  );
};
