import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
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
  Label,
} from "recharts";
import {
  DistrictPlanData,
  DistrictPlanPoints,
} from "../interfaces/AnalysisInterface";
import { GlobalContext, GlobalTypes } from "../../globalContext";
import { TooltipProps } from "recharts";
import { Button, Grid, Typography, makeStyles } from "@mui/material";

interface DistrictPlanScatterPlotProps {
  axisLabels: Array<string>;
  availableData: Array<DistrictPlanPoints>;
  unavailableData: Array<DistrictPlanPoints>;
}

export default function DistrictPlanScatterPlot({
  axisLabels,
  availableData,
  unavailableData,
}: DistrictPlanScatterPlotProps) {
  const [displayedDistrictPlans, setDisplayedDistrictPlans] = useState<
    Array<DistrictPlanData>
  >([]);
  const [modal, setModal] = useState<boolean>(false);
  const { state, dispatch } = useContext(GlobalContext);

  function handleDistrictPlanSelection(point: any) {
    const districtPlanId = point.district_plan_id;
    if (!state[state.length - 1].districtPlanIds.includes(districtPlanId)) {
      dispatch({
        type: GlobalTypes.AddDistrictPlan,
        payload: {
          planId: districtPlanId,
        },
      });
    }
  }

  function handleOpenModal(open: boolean) {
    setModal(open);
  }

  interface CustomTooltipProps extends TooltipProps<any, any> {
    active?: boolean;
    payload?: Array<{
      name: string;
      payload: {
        district_plan: string;
        district_plan_id: string;
        availableData: boolean;
        x: number;
        y: number;
      };
    }>;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const selectedPoint = payload[0].payload;
      const xLabel = payload[0].name;
      const yLabel = payload[1].name;

      return (
        <div className="custom-tooltip">
          <p className="tooltip-text">
            <b>{"District Plan: "}</b>
            {selectedPoint.district_plan}
          </p>
          <p className="tooltip-text">
            <b>{`${xLabel}: `}</b>
            {selectedPoint.x}
          </p>
          <p className="tooltip-text">
            <b>{`${yLabel}: `}</b>
            {selectedPoint.y}
          </p>
        </div>
      );
    }
    return null;
  };

  function handleViewAllPlans(): void {
    dispatch(availableData.map((data) => ({
      type : GlobalTypes.AddDistrictPlan,
      payload : {
        planId : data.district_plan_id
      }
    })))
  }

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        xs={12}
        style={{
          height: "10%",
          marginBottom : 6
        }}
      >
        <Button onClick={() => handleViewAllPlans()}>View All Plans</Button>
      </Grid>
      <AlertModal openCallBack={handleOpenModal} isOpen={modal} />
      <Grid
        item
        xs={1}
        style={{
          height: "10%",
        }}
      >
        <Typography
          variant="h6"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "0 0", // Rotate around the top-left corner
            whiteSpace: "nowrap",
          }}
        >
          Dimension 2
        </Typography>
      </Grid>

      <Grid item xs={11}>
        <ScatterChart width={720} height={590} margin={{ right: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <ZAxis dataKey="z" type="number" name="District Plan" />
          <XAxis dataKey="x" type="number" name={axisLabels[0]}></XAxis>
          <YAxis dataKey="y" type="number" name={axisLabels[1]}></YAxis>
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
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          Dimension 1
        </Typography>
      </Grid>

      {/* <div
          style={{
            display: "flex",
            fontSize: "1.0rem",
            margin: "2rem",
            fontWeight: "700",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {axisLabels[0]}
        </div> */}
    </Grid>
  );
}
