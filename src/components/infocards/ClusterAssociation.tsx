import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ensemble_summary_table } from "../types/TableTypes";
import { GlobalContext, AvailableStates } from "../../globalContext";
import { useParams } from "react-router-dom";
import { fetchAssociationData } from "../apiClient";

interface AssociationData {
  numDistrictPlans: number;
  ensemble1: number;
  ensemble2: number;
  ensemble3: number;  
  ensemble4: number;
  ensemble5: number;
}

export default function ClusterAssociationInfoCard() {

  const { state, dispatch } = React.useContext(GlobalContext);
  const { stateName } = useParams<{ stateName: AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;
  const [curDetails, setDetails] = React.useState(
    state[state.length - 1].districtPlanTypes[currentState]
  );
  const [ axisLabels, setAxisLabels ] = useState<Array<number>>([]);
  const [ graphData, setGraphData ] = useState<Array<AssociationData>>([]);

  useEffect(() => {
    async function getAssociationData() {
      try {
        const {distanceMeasure} = state[state.length - 1]
        const response = await fetchAssociationData(currentState, distanceMeasure);
        if (response) {
          setAxisLabels([response.x_axis_label, response.y_axis_label]);
          setGraphData(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
    getAssociationData();
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div">
          {curDetails}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead sx={{ height: "10px", fontSize: "10px" }}>
            <TableRow>
              <TableCell align="center">Ensemble Size</TableCell>
              <TableCell align="center">Number of Clusters</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {graphData.map((point, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {point.numDistrictPlans}
                </TableCell>
                <TableCell align="center">{point.ensemble1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  );
}
