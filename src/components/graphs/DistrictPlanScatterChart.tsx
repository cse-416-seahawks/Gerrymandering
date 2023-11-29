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
import AlertModal from "../AlertModal";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { GlobalContext } from "../../globalContext";
import {
  district_summary_table,
} from "../types/TableTypes";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";

interface DistrictPlanScatterPlotProps {
  district_plans: DistrictPlanData[];
}

export default function DistrictPlanScatterPlot({ district_plans }: DistrictPlanScatterPlotProps) {
  const [displayedDistrictPlans, setDisplayedDistrictPlans] = useState<
    Array<district_summary_table>
  >([]);
  const [districtPlans, setDistrictPlans] = useState<Array<DistrictPlanData>>(
    []
  );
  const [modal, setModal] = useState<boolean>(false);

  function handleDistrictSelection(point: any) {
    const plan = {
      district_plan: point.z,
      opportunity_districts: 5,
      democrat: "30%",
      republican: "70%",
      map_value: [35.5, -115],
    };
    if (
      !displayedDistrictPlans.some(
        (item) => item.district_plan === plan.district_plan
      )
    ) {
      setDisplayedDistrictPlans([...displayedDistrictPlans, plan]);
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

  function handleOpenModal(open: boolean) {
    setModal(open);
  }
  return (
    <div>
      <AlertModal openCallBack={handleOpenModal} isOpen={modal} />
      <div className="graph-container-row">
        <div className="graph-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "350px",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                textAlign: "center",
                fontSize: "1.0rem",
                height: "100px",
                width: "60px",
              }}
            >
              {"# Districts w/ African American Population > 5,000,000"}
            </div>
          </div>
          <ScatterChart
            width={700}
            height={350}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <ZAxis dataKey="z" type="number" name="District Plan" />
            <XAxis
              dataKey="x"
              type="number"
              name="Average African-American Population (%)"
            />
            <YAxis
              dataKey="y"
              type="number"
              name="# Districts w/ African American Population > 5,000,000"
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{ fontSize: 18 }}
            />
            <Legend />
            <Scatter
              name="Available Data"
              data={sampleData.data01}
              fill="#82ca9d"
              onClick={handleDistrictSelection}
            />
            <Scatter
              name="Unavailable Data"
              data={sampleData.data02}
              fill="#ca8287"
              onClick={() => handleOpenModal(true)}
            />
          </ScatterChart>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "1.0rem",
            width: "65%",
            margin: "2rem",
            fontWeight: "700",
            justifyContent: "end",
          }}
        >
          {"Average African-American Population (%)"}
        </div>
      </div>
      <TableContainer className="plan-table-container" component={Paper}>
        <div style={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">District Plan</TableCell>
                <TableCell align="center"># Opportunity Districts</TableCell>
                <TableCell align="center">Avg Republican %</TableCell>
                <TableCell align="center">Avg Democratic %</TableCell>
              </TableRow>
            </TableHead>
            {displayedDistrictPlans.length == 0 ? (
              <>
                <TableCell
                  component="th"
                  scope="row"
                  width="100rem"
                ></TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  width="100rem"
                ></TableCell>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100px",
                  }}
                >
                  No selected district plans
                </div>
              </>
            ) : (
              <>
                <TableBody>
                  {displayedDistrictPlans.map((row) => (
                    <TableRow
                      key={row.district_plan}
                      onDoubleClick={() =>
                        removeSelectedDistrictPlan(row.district_plan)
                      }
                    >
                      <TableCell align="center">{row.district_plan}</TableCell>
                      <TableCell align="center">
                        {row.opportunity_districts}
                      </TableCell>
                      <TableCell align="center">{row.democrat}</TableCell>
                      <TableCell align="center">{row.republican}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
        </div>
      </TableContainer>
    </div>
  );
}
