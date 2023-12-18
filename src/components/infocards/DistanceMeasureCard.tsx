import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import DistanceTable from "../tables/DistanceTable";
import { useParams } from "react-router-dom";

export default function DistanceMeasureCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName } = useParams<{stateName : AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;
  const [curDetails, setDetails] = React.useState(state[state.length - 1].districtPlanTypes[currentState]);

  
  useEffect(() => {
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  },[stateName]);
  
  return (
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom : "1rem" }}>
        <Typography fontWeight="bold" sx={{ fontSize: 14 }}>
          {curDetails}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography fontWeight="bold" sx={{ fontSize: 14 }} component="div">
          Ensemble {state[state.length - 1].ensemble}
        </Typography>
      </Box>
      <DistanceTable />
    </CardContent>
  );
}
