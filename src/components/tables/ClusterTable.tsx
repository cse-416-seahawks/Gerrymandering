import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClusterTableRow from "./ClusterTableRow";
import { ClusterData } from "../interfaces/AnalysisInterface";
import { AvailableStates } from "../../globalContext";
import { Box, CircularProgress, TablePagination } from "@mui/material";
import { useMemo, useState } from "react";

interface ClusterTableProps {
  currentState: AvailableStates;
  ensembleId: string;
  clusters: ClusterData[];
  onClusterSelection: (cluster: ClusterData) => void;
}

export default function ClusterTable({
  currentState,
  ensembleId,
  clusters,
  onClusterSelection,
}: ClusterTableProps) {
  const [clustersPerPage, setClustersPerPage] = useState(7);
  const [page, setPage] = React.useState(0);
  function setSelectedCluster(cluster: ClusterData) {
    onClusterSelection(cluster);
  }

  const visibleClusters = clusters.slice(page * clustersPerPage, page * clustersPerPage + clustersPerPage)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClustersPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {clusters ? (
        <Paper>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Number</TableCell>
                  <TableCell />
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">District Plans</TableCell>
                  <TableCell align="center">Avg Distance</TableCell>
                  <TableCell align="center">
                    Avg % of Republican Voters
                  </TableCell>
                  <TableCell align="center">
                    Avg % of Democratic Voters
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleClusters.map((cluster) => (
                  <ClusterTableRow
                    currentState={currentState}
                    ensembleId={ensembleId}
                    key={cluster.cluster_number}
                    data={cluster}
                    onClusterSelection={setSelectedCluster}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6, 8, 10]}
            component="div"
            count={clusters.length}
            rowsPerPage={clustersPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
