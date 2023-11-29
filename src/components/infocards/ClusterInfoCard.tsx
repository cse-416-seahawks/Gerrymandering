import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MapIcon from '@mui/icons-material/Map';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function ClusterInfoCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");

  const stateDetails = {
    Nevada: "Nevada State Assembly 2022",
    Texas: "Texas House Districts 2022",
    Virginia: "Virginia House Districts 2022",
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

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
      <Grid>
          <Typography sx={{ mt: 4, mb: 1 }} variant="subtitle1" component="div">
            Ensemble {state[state.length - 1].ensemble} Summary
          </Typography>
          <Demo>
            <List>
              <ListItem>
                <ListItemIcon>
                  <BubbleChartIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1">Total Number of Clusters</Typography>}
                />
                <Typography variant="subtitle1">6 Clusters</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MapIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Total Number of District Plans</Typography>}
                  />
                  <Typography variant="subtitle1">112 Plans</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Distance Measure</Typography>}
                  />
                  <Typography color="blue" variant="subtitle1">{state[state.length - 1].distanceMeasure}</Typography>
                </ListItem>
            </List>
          </Demo>
        </Grid>
    </CardContent>
  );
}
