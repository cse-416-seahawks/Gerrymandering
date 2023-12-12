import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Chip, Divider, Grid, Stack, styled } from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function ClusterInfoCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName } = useParams<{ stateName: AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;
  const [curDetails, setDetails] = React.useState(
    state[state.length - 1].districtPlanTypes[currentState]
  );

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
            <Typography
              color="text.secondary"
              fontWeight="bold"
              variant="body2"
            >
              50%
            </Typography>
            <Box flexGrow="0.5" />
            <Typography color="red" variant="body2">
              Republican Voter Percentage
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight="bold"
              variant="body2"
            >
              50%
            </Typography>
          </Box>
        </Box>
        <Divider variant="fullWidth">
          {" "}
          <Typography variant="body1"> Demographics </Typography>{" "}
        </Divider>
        <Box sx={{ m: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={3} >
              <Chip color="secondary" label="Caucasian-American" />
            </Grid>
            <Grid item xs={3}>
              <Chip color="secondary" label="African-American" />
            </Grid>
            <Grid item xs={3}>
              <Chip color="secondary" label="Asian-American" />
            </Grid>
            <Grid item xs={3}>
              <Chip color="secondary" label="Latin-American" />
            </Grid>

          </Grid>
        </Box>
      </Grid>
    </CardContent>
  );
}
