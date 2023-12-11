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

interface PlanDetailsProps  {

}
export default function PlanDetails({} : PlanDetailsProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");

  useEffect(() => {
    let currentState = state[state.length - 1].currentState;
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  }, [state[state.length - 1].currentState]);
  
  return (
    <CardContent>
      <Typography
        align="left"
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        Plan 2
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          Nevada District Plan 1
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <EnsembleDetailTable />
    </CardContent>
  );
}