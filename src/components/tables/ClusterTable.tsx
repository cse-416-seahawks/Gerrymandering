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

interface ClusterTableProps {
  clusters: ClusterData[];
  onClusterSelection: (
    cluster: ClusterData,
  ) => void;
}

export default function ClusterTable({ clusters, onClusterSelection }: ClusterTableProps) {
  function setSelectedCluster(cluster: ClusterData) {
    onClusterSelection(cluster);
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Number</TableCell>
            <TableCell />
            <TableCell align="center">Name</TableCell>
            <TableCell align="center"># District Plans</TableCell>
            <TableCell align="center">Avg Distance Between Plans</TableCell>
            <TableCell align="center">Avg Republican Voters</TableCell>
            <TableCell align="center">Avg Democratic Voters</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clusters.map((cluster) => (
            <ClusterTableRow key={cluster.name} data={cluster} onClusterSelection={setSelectedCluster}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
