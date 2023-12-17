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
import PlanDetails from "../plan-compare/PlanDetails";
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


  const details = [
    {
      "Republican Districts": 21,
      "Democratic Districts": 22,
    },
    {
      "Average % Republican Voters": 51,
      "Average % of Democratic Voters": 54,
    },
    {
      "Caucasian Population": 0.3,
      "African American Population": 0.1,
    },
    {
      Hispanic: 0.3,
      Other: 0.1,
    },
  ];
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar aboutPage={false} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 275,
                maxHeight: "50vh",
                margin: 1,
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
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 275,
                minHeight: "53.2vh",
                margin: 1,
              }}
            >
              <PlanSelection
                districtPlanData={state[state.length - 1].clusterDetails}
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 275,
                minHeight: "35vh",
                margin: 1,
              }}
            >
              <EnactedPlanDetails />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 275,
                minHeight: "35vh",
                margin: 1,
              }}
            >
              <PlanDetails />
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
