

import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { fetchDistanceMeasureData } from "../apiClient";
import {  GlobalContext } from "../../globalContext";
import { DistanceMeasureType } from "../interfaces/AnalysisInterface";

function DistanceStatsTable() {
  const { state, dispatch } = useContext(GlobalContext);
  const distanceMeasuresData: Array<DistanceMeasureType> = state[state.length - 1].compareDistanceMeasuresData;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Distance Measure</TableCell>
              <TableCell align="center">Min</TableCell>
              <TableCell align="center">1st Quartile</TableCell>
              <TableCell align="center">Median</TableCell>
              <TableCell align="center">3rd Quartile</TableCell>
              <TableCell align="center">Max</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distanceMeasuresData.map((row) => (
              <TableRow key={row.distanceMeasure}>
                <TableCell align="left"> {row.distanceMeasure} </TableCell>
                <TableCell align="center"> {row.min} </TableCell>
                <TableCell align="center"> {row.first_quartile} </TableCell>
                <TableCell align="center"> {row.median} </TableCell>
                <TableCell align="center"> {row.third_quartile} </TableCell>
                <TableCell align="center"> {row.max} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DistanceStatsTable;

