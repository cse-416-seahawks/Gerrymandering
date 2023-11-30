import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import { DistrictPlanData, DistrictPlanGraphData, DistrictPlanPoints } from "../interfaces/AnalysisInterface";
import { GlobalContext } from "../../globalContext";
import { TooltipProps } from "recharts";

interface DistrictPlanScatterPlotProps {
  axisLabels: Array<string>;
  availableData: Array<DistrictPlanPoints>;
  unavailableData: Array<DistrictPlanPoints>;
}

export default function DistrictPlanScatterPlot({ axisLabels, availableData, unavailableData }: DistrictPlanScatterPlotProps) {
  const [displayedDistrictPlans, setDisplayedDistrictPlans] = useState<Array<DistrictPlanData>>([]);
  const [modal, setModal] = useState<boolean>(false);
  const { state, dispatch } = useContext(GlobalContext);
  
  function handleDistrictPlanSelection(point: any) {
    const districtPlanId = point.district_plan_id;
    const districtPlanDetails = state[state.length - 1].clusterDetails.find((row) => row.district_plan_id == districtPlanId); 
    if (districtPlanDetails) {
      if (!displayedDistrictPlans.some((item) => item.district_plan === districtPlanDetails.district_plan)) {
        setDisplayedDistrictPlans([...displayedDistrictPlans, districtPlanDetails]);
      }
    }
  }

  function removeSelectedDistrictPlan(districtPlanNum: number) {
    const selected = displayedDistrictPlans.map((item) => {
      return item;
    });
    const newSelected = selected.filter((item) => item.district_plan !== districtPlanNum);
    setDisplayedDistrictPlans(newSelected);
  }

  function handleOpenModal(open: boolean) {
    setModal(open);
  }

  interface CustomTooltipProps extends TooltipProps<any, any> {
    active?: boolean;
    payload?: Array<{
      name: string; payload: {
        district_plan: string; district_plan_id: string; availableData: boolean; x: number; y: number; 
      } 
    }>;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const selectedPoint = payload[0].payload;
      const xLabel = payload[0].name;
      const yLabel = payload[1].name;

      return (
        <div className="custom-tooltip">
          <p className="tooltip-text"><b>{"District Plan: "}</b>{selectedPoint.district_plan}</p>
          <p className="tooltip-text"><b>{`${xLabel}: `}</b>{selectedPoint.x}</p>
          <p className="tooltip-text"><b>{`${yLabel}: `}</b>{selectedPoint.y}</p>
        </div>
      );
    }
    return null;
  };

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
              {axisLabels[1]}
            </div>
          </div>
          <ScatterChart width={760} height={350} margin={{ top: 20, right: 20, bottom: 10, left: 10 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <ZAxis dataKey="z" type="number" name="District Plan" />
            <XAxis dataKey="x" type="number" name={axisLabels[0]} />
            <YAxis dataKey="y" type="number" name={axisLabels[1]} />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ strokeDasharray: "3 3" }} 
              wrapperStyle={{ outline: "none" }} 
            />
            <Legend />
            <Scatter
              name="Available Data"
              data={availableData}
              fill="#82ca9d"
              onClick={handleDistrictPlanSelection}
            />
            <Scatter
              name="Unavailable Data"
              data={unavailableData}
              fill="#ca8287"
              onClick={() => handleOpenModal(true)}
            />
          </ScatterChart>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "1.0rem",
            margin: "2rem",
            fontWeight: "700",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          {axisLabels[0]}
        </div>
      </div>
      <TableContainer className="plan-table-container" component={Paper}>
        <div style={{ width: "100%", overflow: "auto" }}>
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
              <TableRow sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <TableCell component="th" scope="row" width="100rem"></TableCell>
                <TableCell component="th" scope="row" width="100rem"></TableCell>
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
              </TableRow>
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
                      <TableCell align="center">{row.avg_democrat}</TableCell>
                      <TableCell align="center">{row.avg_republican}</TableCell>
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
