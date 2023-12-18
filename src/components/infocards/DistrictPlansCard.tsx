import React, { FC, useState, useContext, useEffect } from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  TableContainer,
  TableHead,
  Typography,
  CardContent,
  Fab,
  Button,
  TablePagination,
} from "@mui/material";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import {
  AvailableStates,
  GlobalContext,
  GlobalTypes,
} from "../../globalContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { fetchClusterDetails } from "../apiClient";
import { useParams } from "react-router-dom";

export default function DistrictPlansCard() {
  const [displayedDistrictPlans, setDisplayedDistrictPlans] = useState<
    Array<DistrictPlanData>
  >([
    {
      district_plan_id: "ORIGINAL",
      district_plan: 0,
      opportunity_districts: 15,
      splits: [5, 5],
      avg_democrat: "0.30",
      avg_republican: "0.70",
    },
  ]);

  const [allDistrictPlans, setAll] = useState<Array<DistrictPlanData>>([]);
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName, clusterId } = useParams<{
    stateName: AvailableStates;
    clusterId: string;
  }>();
  const [plansPerPage, setPlansPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const currentState = stateName || AvailableStates.Unselected;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlansPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visiblePlans = displayedDistrictPlans.slice(page * plansPerPage, page * plansPerPage + plansPerPage);

  function removeSelectedDistrictPlan(districtPlanNum: number) {
    const selected = displayedDistrictPlans.map((item) => {
      return item;
    });
    const newSelected = selected.filter(
      (item) => item.district_plan !== districtPlanNum
    );
    setDisplayedDistrictPlans(newSelected);
  }

  useEffect(() => {
    async function getClusterDetail() {
      try {
        let currentClusterId = clusterId || "ORIGINAL";
        const response = await fetchClusterDetails(
          currentState,
          currentClusterId
        );
        setAll(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getClusterDetail();
  }, []);

  useEffect(() => {
    console.log("updating plans");
    const latestState = state[state.length - 1];
    let newDisplayedPlans = allDistrictPlans.filter((districtPlan) =>
      latestState.districtPlanIds.includes(districtPlan.district_plan_id)
    );
    newDisplayedPlans.unshift({
      district_plan_id: "ORIGINAL",
      district_plan: 0,
      opportunity_districts: 15,
      splits: [5, 5],
      avg_democrat: "0.30",
      avg_republican: "0.70",
    });
    setDisplayedDistrictPlans(newDisplayedPlans);
  }, [state, allDistrictPlans]);

  useEffect(() => {
    const totalPages = Math.ceil(displayedDistrictPlans.length / plansPerPage);

    // Ensure the page is set to the latest page when the item is added
    setPage(totalPages - 1);
  }, [displayedDistrictPlans, plansPerPage]);

  function handleRemovePlan(district_plan_id: string): void {
    dispatch({
      type: GlobalTypes.RemoveDistrictPlan,
      payload: {
        planId: district_plan_id,
      },
    });
    setDisplayedDistrictPlans(
      displayedDistrictPlans.filter(
        (plan) => plan.district_plan_id !== district_plan_id
      )
    );
    console.log("after removal", state[state.length - 1].districtPlanIds);
  }

  return (
    <CardContent>
      <TableContainer className="plan-table-container" component={Paper}>
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          <Table size="small" style={{ width: "100%", height: "100%", overflow: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">District Plan</TableCell>
                <TableCell align="center"># Opportunity Districts</TableCell>
                <TableCell align="center">Avg Republican %</TableCell>
                <TableCell align="center">Avg Democratic %</TableCell>
                <TableCell align="center">Remove Plan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visiblePlans.map((row) => (
                <TableRow
                  key={row.district_plan}
                  onDoubleClick={() =>
                    removeSelectedDistrictPlan(row.district_plan)
                  }
                >
                  <TableCell align="center">
                    {row.district_plan === 0 ? (
                      <Typography color="secondary">
                        2022 District Plan
                      </Typography>
                    ) : (
                      row.district_plan + 1
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.opportunity_districts}
                  </TableCell>
                  <TableCell align="center">{row.avg_democrat}</TableCell>
                  <TableCell align="center">{row.avg_republican}</TableCell>
                  <TableCell align="center">
                    <Button
                      disabled={row.district_plan === 0}
                      onClick={() => handleRemovePlan(row.district_plan_id)}
                      sx={{ color: "red" }}
                    >
                      <RemoveCircleIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3]}
        component="div"
        count={displayedDistrictPlans.length}
        rowsPerPage={plansPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </CardContent>
  );
}
