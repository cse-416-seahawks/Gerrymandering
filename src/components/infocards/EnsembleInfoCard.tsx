import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Chip,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import EnsembleDetailTable from "../tables/EnsembleDetailTable";
import { useParams } from "react-router-dom";

export default function EnsembleInfoCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName } = useParams<{stateName : AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;
  const [curDetails, setDetails] = React.useState(state[state.length - 1].districtPlanTypes[currentState]);


  
  return (
    <CardContent>
      <Typography
        align="left"
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        Current District Plan
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          {curDetails}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <EnsembleDetailTable />
    </CardContent>
  );
}
