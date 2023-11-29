import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Chip,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import EnsembleDetailTable from "../tables/EnsembleDetailTable";

export default function EnsembleInfoCard() {
  const stateDetails = {
      Nevada: "Nevada State Assembly 2022",
      Texas: "Texas House Districts 2022",
      Virginia: "Virginia House Districts 2022",
    };
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");

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
        <Stack direction="row" spacing={1}>
          <Chip
            label="Democratic Districts"
            style={{ backgroundColor: "blue", color: "white" }}
          />
          <Chip
            label="Republican Districts"
            style={{ backgroundColor: "red", color: "white" }}
            variant="outlined"
          />
        </Stack>
      </Box>
      <EnsembleDetailTable />
    </CardContent>
  );
}
