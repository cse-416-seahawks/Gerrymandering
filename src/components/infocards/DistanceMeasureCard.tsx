import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import DistanceTable from "../tables/DistanceTable";

export default function DistanceMeasureCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");

  const stateDetails = {
    Nevada: "Nevada State Assembly 2022",
    Texas: "Texas House Districts 2022",
    Virginia: "Virginia House Districts 2022",
  };

  useEffect(() => {
    let currentState = state[state.length - 1].currentState;
    if (currentState === AvailableStates.Nevada) {
      setDetails(stateDetails.Nevada);
    } else if (currentState === AvailableStates.Virginia) {
      setDetails(stateDetails.Virginia);
    } else {
      setDetails(stateDetails.Texas);
    }
  }, [state[state.length - 1].currentState]);
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
