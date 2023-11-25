import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClusterTableRow from "./ClusterTableRow";

interface ClusterData {
  cluster_number: number;
  cluster_id: string,
  name: string;
  num_dist_plans: number;
  avg_rep: string;
  avg_dem: string;
  avg_distance: number;
  demographics: ClusterDemographicData;
  district_plans: Array<string>;
}

interface ClusterDemographicData {
  caucasian: number;
  african_american: number;
  asian_american: number;
  hispanic: number;
  other: number;
}

interface ClusterTableProps {
  clusters: ClusterData[];
}
export default function ClusterTable({ clusters }: ClusterTableProps) {
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
            <ClusterTableRow
              key={cluster.name}
              data={cluster}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
