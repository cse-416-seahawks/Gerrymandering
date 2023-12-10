import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Fab, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router-dom";

interface ClusterDetailTableProps {
  districtPlanData: Array<DistrictPlanData>;
}

export default function ClusterDetailTable({
  districtPlanData,
}: ClusterDetailTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const navigate = useNavigate();

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
    return districtPlanData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const handleCompare = (planId : string) => {

    navigate('/plan-comparison')
  }

  return (
    <div>
      <TableContainer
        className="plan-table-container"
        component={Paper}
        sx={{ maxHeight: "71vh" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">District Plan</TableCell>
              <TableCell align="center"># Opportunity Districts</TableCell>
              <TableCell align="center">Avg Republican %</TableCell>
              <TableCell align="center">Avg Democratic %</TableCell>
              <TableCell align="center">Compare with Enacted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spliceTableData().map((row) => (
              <TableRow key={row.district_plan}>
                <TableCell component="th" scope="row">
                  {<button style={buttonStyle}>{row.district_plan}</button>}
                </TableCell>
                <TableCell align="center">
                  {row.opportunity_districts}
                </TableCell>
                <TableCell align="center">{row.avg_democrat}</TableCell>
                <TableCell align="center">{row.avg_republican}</TableCell>
                <TableCell align="center">
                  <Fab variant="extended" size="small" onClick={() => handleCompare(row.district_plan_id)} color="primary">
                    Compare
                  </Fab>
                </TableCell>
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
  );
}
