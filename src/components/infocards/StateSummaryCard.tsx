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
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  AvailableStates,
  Demographics,
  GlobalContext,
} from "../../globalContext";
import { useContext } from "react";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import MapIcon from "@mui/icons-material/Map";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useParams } from "react-router-dom";
import { fetchClusterSummaryData, fetchStateSummary } from "../apiClient";
import { ClusterData } from "../interfaces/AnalysisInterface";

interface StateSummaryData {
  type: string;
  State: AvailableStates;
  demographics: {
    black: number;
    white: number;
    asian: number;
    hispanic: number;
    other: number;
  };
  population: number;
  voting_population: number;
  split: [number, number];
}


export default function StateSummaryCard() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName, ensembleId } = useParams<{
    stateName: AvailableStates;
    ensembleId: string;
  }>();
  const [clusterData, setClusterData] = useState<Array<ClusterData>>([]);
  const [stateSummary, setStateSummary] = useState<StateSummaryData | null>(
    null
  );
  const currentState = stateName || AvailableStates.Unselected;
  const currentEnsembleId = ensembleId || "0000";
  const [curDetails, setDetails] = useState(
    state[state.length - 1].districtPlanTypes[currentState]
  );

  useEffect(() => {
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  }, [state, currentState]);

  const totalDistricts = {
    [AvailableStates.Nevada] : 42,
    [AvailableStates.Texas] : 36,
    [AvailableStates.Virginia] : 100,
    [AvailableStates.Unselected] : 0
  }

  

  useEffect(() => {
    async function getStateSummary() {
      try {
        const response = await fetchStateSummary(currentState);
        setStateSummary(response);
      } catch (error) {
        console.log(error);
      }
    }
    getStateSummary();
  }, [stateName]);

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
        <Typography
          sx={{ fontSize: "1.2rem" }}
          align="left"
          fontWeight="bold"
          variant="body1"
          component="div"
        >
          State Summary
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Black</TableCell>
                <TableCell>White</TableCell>
                <TableCell>Asian</TableCell>
                <TableCell>Hispanic</TableCell>
                <TableCell>Other</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>
                {(stateSummary?.demographics.black.toFixed(3)) }
              </TableCell>
              <TableCell>
                {stateSummary?.demographics.white.toFixed(3)}
              </TableCell>
              <TableCell>
                {stateSummary?.demographics.asian.toFixed(3)}
              </TableCell>
              <TableCell>
                {stateSummary?.demographics.hispanic.toFixed(3)}
              </TableCell>
              <TableCell>
                {stateSummary?.demographics.other.toFixed(3)}
              </TableCell>
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Tot. Districts</TableCell>
                <TableCell align="left">Tot. Population</TableCell>
                <TableCell align="left">Voting Population</TableCell>
                <TableCell align="left">Rep. Districts</TableCell>
                <TableCell align="left">Dem. Districts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableCell align="left">{totalDistricts[currentState]}</TableCell>
              <TableCell align="left">{stateSummary?.population.toLocaleString()}</TableCell>
              <TableCell align="left">{stateSummary?.voting_population.toLocaleString()}</TableCell>
              <TableCell align="left">{Math.floor(totalDistricts[currentState] * (stateSummary ? stateSummary.split[1] : 0))}</TableCell>
              <TableCell align="left">{Math.ceil(totalDistricts[currentState] * (stateSummary ? stateSummary.split[0] : 0))}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </CardContent>
  );
}
