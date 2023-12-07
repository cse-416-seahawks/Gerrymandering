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
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import { GlobalContext } from "../../globalContext";

export default function DistrictPlansCard() {
  const [displayedDistrictPlans, setDisplayedDistrictPlans] = useState<
    Array<DistrictPlanData>
  >([
    {
      district_plan_id: 0,
      district_plan: 0,
      opportunity_districts: 15,
      splits: [5, 5],
      avg_democrat: "0.30",
      avg_republican: "0.70",
    },
  ]);
  const { state, dispatch } = useContext(GlobalContext);
  function handleDistrictPlanSelection(point: any) {
    const districtPlanId = point.district_plan_id;
    const districtPlanDetails = state[state.length - 1].clusterDetails.find(
      (row) => row.district_plan_id == districtPlanId
    );
    if (districtPlanDetails) {
      if (
        !displayedDistrictPlans.some(
          (item) => item.district_plan === districtPlanDetails.district_plan
        )
      ) {
        setDisplayedDistrictPlans([
          ...displayedDistrictPlans,
          districtPlanDetails,
        ]);
      }
    }
  }

  function removeSelectedDistrictPlan(districtPlanNum: number) {
    const selected = displayedDistrictPlans.map((item) => {
      return item;
    });
    const newSelected = selected.filter(
      (item) => item.district_plan !== districtPlanNum
    );
    setDisplayedDistrictPlans(newSelected);
  }
  return (
    <CardContent>
      <TableContainer className="plan-table-container" component={Paper}>
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          <Table style={{ width: "100%", height: "100%", overflow: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">District Plan</TableCell>
                <TableCell align="center"># Opportunity Districts</TableCell>
                <TableCell align="center">Avg Republican %</TableCell>
                <TableCell align="center">Avg Democratic %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedDistrictPlans.map((row) => (
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
                      row.district_plan
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.opportunity_districts}
                  </TableCell>
                  <TableCell align="center">{row.avg_democrat}</TableCell>
                  <TableCell align="center">{row.avg_republican}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </CardContent>
  );
}
