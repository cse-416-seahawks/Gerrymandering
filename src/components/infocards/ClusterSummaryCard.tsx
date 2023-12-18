import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Chip, Divider, Grid, Stack, styled } from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchClusterSummaryData } from "../apiClient";
import { ClusterData } from "../interfaces/AnalysisInterface";

export default function ClusterInfoCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName, ensembleId, clusterId } = useParams<{
    stateName: AvailableStates;
    ensembleId: string;
    clusterId: string;
  }>();
  const [clusterSummary, setClusterSummary] = useState<ClusterData | null>(
    null
  );
  const currentState = stateName || AvailableStates.Unselected;
  const [curDetails, setDetails] = React.useState(
    state[state.length - 1].districtPlanTypes[currentState]
  );

  useEffect(() => {
    const distanceMeasure = state[state.length - 1].distanceMeasure;
    const curEnsemble = ensembleId || "";
    const curCluster = clusterId || "";
    async function getClusterData() {
      try {
        const response = await fetchClusterSummaryData(
          currentState,
          curEnsemble,
          distanceMeasure
        );
        if (response) {
          setClusterSummary(
            response.data.find(
              (cluster: ClusterData) => curCluster === cluster.cluster_id
            )
          );
        }
      } catch (error) {
        throw error;
      }
    }
    getClusterData();
  }, [state[state.length - 1].ensemble]);

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
              Average Democratic Voter Percentage
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight="bold"
              variant="body2"
            >
              {clusterSummary !== null
                ? (parseFloat(clusterSummary.avg_dem) * 100).toFixed(1)
                : 0}
              %
            </Typography>
            <Box flexGrow="0.5" />
            <Typography color="red" variant="body2">
              Average Republican Voter Percentage
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight="bold"
              variant="body2"
            >
              {clusterSummary !== null
                ? (parseFloat(clusterSummary.avg_rep) * 100).toFixed(1)
                : 0}
              %
            </Typography>
          </Box>
        </Box>
        <Divider variant="fullWidth">
          <Typography variant="body1"> Demographics (Average %) </Typography>{" "}
        </Divider>
        <Box sx={{ m: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={2.4}>
              <Chip color="secondary" label="Caucasian-American" />
            </Grid>
            <Grid item xs={2.4}>
              <Chip color="secondary" label="African-American" />
            </Grid>
            <Grid item xs={2.4}>
              <Chip color="secondary" label="Asian-American" />
            </Grid>
            <Grid item xs={2.4}>
              <Chip color="secondary" label="Latin-American" />
            </Grid>
            <Grid item xs={2.4}>
              <Chip color="secondary" label="Other Groups" />
            </Grid>
            <Grid item xs={2.4}>
              <Typography fontWeight="bold">
                {clusterSummary ? parseFloat((clusterSummary.demographics.white * 100).toFixed(1)): 0}%
              </Typography>
            </Grid>
            <Grid item xs={2.4}>
              <Typography fontWeight="bold">
              {clusterSummary ? parseFloat((clusterSummary.demographics.black * 100).toFixed(1)) : 0}%
              </Typography>
            </Grid>
            <Grid item xs={2.4}>
              <Typography fontWeight="bold">
              {clusterSummary ? parseFloat((clusterSummary.demographics.asian * 100).toFixed(1)) : 0}%
              </Typography>
            </Grid>
            <Grid item xs={2.4}>
              <Typography fontWeight="bold">
              {clusterSummary ? parseFloat((clusterSummary.demographics.hispanic * 100).toFixed(1)) : 0}%
              </Typography>
            </Grid>
            <Grid item xs={2.4}>
              <Typography fontWeight="bold">
              {clusterSummary ? parseFloat((clusterSummary.demographics.other * 100).toFixed(1)) : 0}%
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </CardContent>
  );
}
