import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Boxplot from "./Boxplot";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const distanceMeasuresData = [
  {
    measure: "Hamming Distance",
    min: getRandomNumber(10, 15),
    low: getRandomNumber(15, 30),
    median: getRandomNumber(30, 40),
    high: getRandomNumber(40, 50),
    max: getRandomNumber(50, 60),
  },
  {
    measure: "Optimal Transport",
    min: getRandomNumber(10, 20),
    low: getRandomNumber(20, 30),
    median: getRandomNumber(30, 50),
    high: getRandomNumber(50, 60),
    max: getRandomNumber(60, 80),
  },
  {
    measure: "Total Variation",
    min: getRandomNumber(15, 20),
    low: getRandomNumber(20, 25),
    median: getRandomNumber(40, 60),
    high: getRandomNumber(65, 75),
    max: getRandomNumber(75, 90),
  },
  {
    measure: "Additional Measure",
    min: getRandomNumber(10, 40),
    low: getRandomNumber(40, 60),
    median: getRandomNumber(60, 65),
    high: getRandomNumber(65, 80),
    max: getRandomNumber(80, 100),
  },
];
function DistanceGraph() {
  return (
    <>
      <div>
        <Boxplot />
      </div>
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
              <TableRow key={row.measure}>
                <TableCell align="left"> {row.measure} </TableCell>
                <TableCell align="center"> {row.min} </TableCell>
                <TableCell align="center"> {row.low} </TableCell>
                <TableCell align="center"> {row.median} </TableCell>
                <TableCell align="center"> {row.high} </TableCell>
                <TableCell align="center"> {row.max} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DistanceGraph;
