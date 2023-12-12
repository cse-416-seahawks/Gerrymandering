import React, { useState, useEffect } from "react";
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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ensemble_summary_table } from "../types/TableTypes";
import { GlobalContext, AvailableStates } from "../../globalContext";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import { useNavigate, useParams } from "react-router-dom";

interface PlanSelectionProps {
  districtPlanData : Array<DistrictPlanData>;
}
export default function PlanSelection({ districtPlanData } : PlanSelectionProps) {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");
  const { stateName } = useParams<{stateName : AvailableStates }>();

  const currentState = stateName || AvailableStates.Unselected;

  useEffect(() => {
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
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

  return (
    <CardContent>
      <Box
        sx={{
          display: "flex",
          marginBottom: "2rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div">
          Select a District Plan
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
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
    </CardContent>
  );
}
