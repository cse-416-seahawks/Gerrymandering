import React, { useContext, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { GlobalContext } from "../../globalContext";

export default function EnsembleDetailTable() {
  const { state } = useContext(GlobalContext);
  const [ensDetails, updateDetails] = useState(
    state[state.length - 1].ensembleDetails
  );

  React.useEffect(() => {
    updateDetails(state[state.length - 1].ensembleDetails);
    console.log("UPDATED", state[state.length - 1].ensembleDetails)
  }, [state[state.length - 1].ensembleDetails]);
  return (
    <TableContainer component={Paper} sx={{ marginTop: "1em" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ensemble</TableCell>
            <TableCell align="center">Clusters</TableCell>
            <TableCell align="center">Avg. distance</TableCell>
            <TableCell align="center">District Plans</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ensDetails.map((ensemble, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Ensemble {ensemble.ensemble}
              </TableCell>
              <TableCell align="center">{ensemble.num_clusters}</TableCell>
              <TableCell align="center">{ensemble.avg_dist_clusters}</TableCell>
              <TableCell align="center">{ensemble.num_dist_plans}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
