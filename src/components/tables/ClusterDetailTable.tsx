import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as sampleData from "../SampleData";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";

interface ClusterDetailTableProps {
  districtPlanData: Array<DistrictPlanData>,
  districtChange: (district_num: number, coords: number[]) => void,
}

export default function ClusterDetailTable({ districtPlanData, districtChange } : ClusterDetailTableProps) {
    const buttonStyle = {
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    };

    return (
        <TableContainer className="plan-table-container" component={Paper}>
              <Table sx={{ minWidth: 630, minHeight : 200, marginRight : 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">District Plan</TableCell>
                    <TableCell align="center"># Opportunity Districts</TableCell>
                    <TableCell align="center">Avg Republican %</TableCell>
                    <TableCell align="center">Avg Democratic %</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {districtPlanData.map((row) => (
                      <TableRow key={row.district_plan}>
                        <TableCell component="th" scope="row">
                          {
                            <button
                              style={buttonStyle}
                              // onClick={() => districtChange(row.district_plan, [-1,-1])}
                            >
                              {row.district_plan}
                            </button>
                          }
                        </TableCell>
                        <TableCell align="center">{row.opportunity_districts}</TableCell>
                        <TableCell align="center">{row.avg_democrat}</TableCell>
                        <TableCell align="center">{row.avg_republican}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
    )
}