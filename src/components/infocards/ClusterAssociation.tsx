import * as React from "react";
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
import { ensemble_summary_table } from "../tables/TableTypes";
import { GlobalContext, AvailableStates } from "../../globalContext";

export default function ClusterAssociationInfoCard() {
  const Data3: ensemble_summary_table[] = [
    { ensemble: 1, num_clusters: 3, plans_needed: 309 },
    { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
    { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
    { ensemble: 4, num_clusters: 5.3, plans_needed: 251 },
    { ensemble: 5, num_clusters: 6.3, plans_needed: 268 },
  ];

  const stateDetails = {
    Nevada: "Nevada State Assembly 2022",
    Texas: "Texas House Districts 2022",
    Virginia: "Virginia House Districts 2022",
  };
  const { state, dispatch } = React.useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");

  React.useEffect(() => {
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
      <Box sx={{ display: "flex", marginBottom : "2rem", justifyContent: "space-between" }}>
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
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead sx={{ height: "10px", fontSize: "10px" }}>
            <TableRow>
              <TableCell>Ensemble</TableCell>
              <TableCell align="right"># of clusters at 500</TableCell>
              <TableCell align="right">
                Plans needed to reach max clusters
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Data3.map((row) => (
              <TableRow key={row.ensemble}>
                <TableCell component="th" scope="row">
                  {row.ensemble}
                </TableCell>
                <TableCell align="right">{row.num_clusters}</TableCell>
                <TableCell align="right">{row.plans_needed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  );
}
