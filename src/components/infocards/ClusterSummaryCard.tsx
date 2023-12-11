import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  styled,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";

export default function ClusterInfoCard() {
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
        Current District Plan
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          {curDetails}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <Grid>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                Cluster 1 Summary
              </Typography>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between">
            <Typography color="blue" variant="body2">
              Democratic Voter Percentage 
            </Typography>
            <Typography color="text.secondary" fontWeight="bold" variant="body2">50%</Typography>
            <Box flexGrow="0.5"/>
            <Typography color="red" variant="body2">
              Republican Voter Percentage
            </Typography>
            <Typography color="text.secondary" fontWeight="bold" variant="body2">50%</Typography>
          </Box>
        </Box>
        <Divider variant="fullWidth"> <Typography variant="body1"> Demographics </Typography> </Divider>
        <Box sx={{ m: 2 }}>

          <Stack justifySelf="center" direction="row" spacing={1}>
            <Chip color="secondary" label="Caucasian" />
            <Chip color="secondary" label="African-American" />
            <Chip color="secondary" label="Asian" />
            <Chip color="secondary" label="Hispanic" />
          </Stack>
        </Box>
        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
          <Button>Add to cart</Button>
        </Box>
      </Grid>
    </CardContent>
  );
}