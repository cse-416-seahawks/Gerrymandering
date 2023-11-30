import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as sampleData from "../SampleData";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

interface ClusterDetailTableProps {
  districtPlanData: Array<DistrictPlanData>
}

export default function ClusterDetailTable({ districtPlanData} : ClusterDetailTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  
  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  function spliceTableData() {
    return districtPlanData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage);
  }  

  function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer className="plan-table-container" component={Paper} sx={{maxHeight: "80vh"}}> 
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">District Plan</TableCell>
              <TableCell align="center"># Opportunity Districts</TableCell>
              <TableCell align="center">Avg Republican %</TableCell>
              <TableCell align="center">Avg Democratic %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spliceTableData().map((row) => (
              <TableRow key={row.district_plan}>
                <TableCell component="th" scope="row">
                  {
                    <button style={buttonStyle}>
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[-1]}
                count={districtPlanData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}