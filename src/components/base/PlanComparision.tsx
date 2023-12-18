import React, { useState, useContext, useEffect } from "react";
import { AvailableStates, GlobalContext } from "../../globalContext";
import "../../App.css";
import StateMap from "../state-map/StateMap";
import Navbar from "./Navbar";
import TableData from "./ClusterAnalysis";
import { fetchMapData } from "../apiClient";
import CompareMap from "../plan-compare/CompareMap";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import EnactedPlanDetails from "../plan-compare/EnactedPlanDetails";
import PlanSelection from "../plan-compare/PlanSelection";
import { useParams } from "react-router-dom";

export default function PlanComparison() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName, planId } = useParams<{
    stateName: AvailableStates;
    planId: string;
  }>();
  const currentState = stateName || AvailableStates.Unselected;
  const currentStateMapData = state[state.length - 1].mapData[currentState];
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar aboutPage={false} />
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Card
              sx={{
                width: "45vw",
                maxHeight: "50vh",
                margin: 1.5,
                marginLeft: 5,
                padding: 2,
              }}
            >
              <CompareMap
                sliderValue={value}
                centerCoordinates={currentStateMapData.centerCoordinates}
                zoom={currentStateMapData.zoom}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography>Plan 1</Typography>
                <Slider
                  sx={{ width: "80%" }}
                  aria-label="Plan Opacity"
                  onChange={handleSliderChange}
                  defaultValue={0}
                  step={0.1}
                  marks
                  min={0}
                  max={1}
                />
                <Typography>Plan 2</Typography>
              </Box>
            </Card>
            <Card
              sx={{
                width: "47vw",
                minHeight: "35vh",
                margin: 1.5,
                marginLeft: 5,
              }}
            >
              <EnactedPlanDetails />
            </Card>
          </Box>
          <Card
            sx={{
              width: "45vw",
              minHeight: "53.2vh",
              margin: 1.5,
              marginRight : 4
            }}
          >
            <PlanSelection
              districtPlanData={state[state.length - 1].clusterDetails}
            />
          </Card>
        </Box>

        {/* <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 275,
                minHeight: "35vh",
                margin: 1,
              }}
            >
              <PlanDetails planId={planId || "ORIGINAL"}/>
            </Card>
          </Grid> */}
      </div>
    </div>
  );
}
