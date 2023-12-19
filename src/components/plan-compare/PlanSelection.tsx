import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Chip,
  IconButton,
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
import {
  GlobalContext,
  AvailableStates,
  GlobalTypes,
  InfoCardType,
} from "../../globalContext";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchClusterSplits } from "../apiClient";

interface PlanSelectionProps {
  districtPlanData: Array<DistrictPlanData>;
}

interface Split {
  district_plan: string;
  splits: [number, number];
}

interface PartySplitData {
  type: string;
  clusterId: string;
  num_districts: number;
  splits: Split[];
}
export default function PlanSelection({
  districtPlanData,
}: PlanSelectionProps) {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");
  const { stateName, clusterId } = useParams<{
    stateName: AvailableStates;
    clusterId: string;
  }>();
  const currentState = stateName || AvailableStates.Unselected;
  const [splitData, setSplitData] = useState<PartySplitData | null>(null);
  useEffect(() => {
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  }, [stateName]);

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

  const buttonStyleSelected = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    color: "white",
    borderRadius: "5px",
    backgroundColor: "#000080",
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

  useEffect(() => {
    const currentState = stateName || AvailableStates.Unselected;
    const curClusterId = clusterId || "";
    async function getClusterSplitData() {
      try {
        const response = await fetchClusterSplits(currentState, curClusterId);
        if (response) {
          setSplitData(response);
        }
      } catch (error) {
        throw error;
      }
    }
    getClusterSplitData();
  }, []);

  function handleSelectPlan(districtPlan: DistrictPlanData) {
    dispatch({
      type: GlobalTypes.SetComparedPlan,
      payload: {
        comparedPlan: districtPlan,
      },
    });
    navigate(
      `/plan-comparison/state/${currentState}/cluster/${clusterId}/district-plan/${districtPlan.district_plan_id}`
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

  function handleStepChange(newStep: number) {
    {
      dispatch([
        {
          type: "CHANGE_INFO_CARD",
          payload: {
            infoCardType: InfoCardType.districtPlans,
          },
        },
        {
          type: GlobalTypes.ShowTypicalPlan,
          payload: {
            cluster_id: "",
          },
        },
      ]);
    }
    navigate(0 - (3 - newStep));
  }

  function BackButton() {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleStepChange(2)}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <CardContent>
      <Box
        sx={{
          display: "flex",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
        <Typography marginTop="0.5rem" variant="h6" component="div">
          Select a District Plan
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <TableContainer
        className="plan-table-container"
        component={Paper}
        sx={{ maxHeight: "75vh", width: "40vw", marginLeft: "2rem" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">District Plan</TableCell>
              <TableCell align="center"># Opportunity Districts</TableCell>
              <TableCell align="center">Dem/Rep Split</TableCell>
              <TableCell align="center">Avg Republican %</TableCell>
              <TableCell align="center">Avg Democratic %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spliceTableData().map((row, index) => {
              const style =
                state[state.length - 1].comparedPlan.district_plan_id ===
                row.district_plan_id
                  ? buttonStyleSelected
                  : buttonStyle;
              const curSplit = splitData?.splits[index];
              return (
                <TableRow key={row.district_plan}>
                  <TableCell component="th" scope="row">
                    {
                      <button
                        onClick={() => handleSelectPlan(row)}
                        style={style}
                      >
                        {(page * rowsPerPage) + (index + 1)}
                      </button>
                    }
                  </TableCell>
                  <TableCell align="center">
                    {row.opportunity_districts}
                  </TableCell>
                  <TableCell align="center">
                    {curSplit ? curSplit?.splits.join(",") : ""}
                  </TableCell>
                  <TableCell align="center">{row.avg_democrat}</TableCell>
                  <TableCell align="center">{row.avg_republican}</TableCell>
                </TableRow>
              );
            })}
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
