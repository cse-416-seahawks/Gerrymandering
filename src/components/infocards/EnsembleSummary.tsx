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
import { useParams } from "react-router-dom";
import { fetchClusterSummaryData } from "../apiClient";
import { ClusterData } from "../interfaces/AnalysisInterface";

export default function ClusterInfoCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName, ensembleId } = useParams<{stateName : AvailableStates, ensembleId : string }>();
  const [clusterData, setClusterData] = useState<Array<ClusterData>>([]);
  const currentState = stateName || AvailableStates.Unselected;
  const currentEnsembleId = ensembleId || "0000";
  const [curDetails, setDetails] = React.useState(state[state.length - 1].districtPlanTypes[currentState]);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  useEffect(() => {
    const distanceMeasure = state[state.length-1].distanceMeasure;
    async function getClusterData() {
      try {
        const response = await fetchClusterSummaryData(currentState, currentEnsembleId, distanceMeasure);
        if (response) setClusterData(response.data);
      } catch(error) {
        throw error;
      }
    }
    getClusterData();

  }, [state[state.length-1].ensemble]);

      
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
          <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="div">
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
                <Typography variant="subtitle1">{clusterData.length} Clusters</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MapIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Total Number of District Plans</Typography>}
                  />
                  <Typography variant="subtitle1"> {clusterData.reduce((acc, cluster) => acc + cluster.district_plans.length, 0)} Plans</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Distance Measure</Typography>}
                  />
                  <Typography color="secondary" variant="subtitle1">{state[state.length - 1].distanceMeasure}</Typography>
                </ListItem>
            </List>
          </Demo>
        </Grid>
    </CardContent>
  );
}
