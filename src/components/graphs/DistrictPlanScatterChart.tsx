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
} from "recharts";
import {
  DistrictPlanData,
  DistrictPlanPoints,
} from "../interfaces/AnalysisInterface";
import { GlobalContext, GlobalTypes } from "../../globalContext";
import { TooltipProps } from "recharts";
import { Button } from "@mui/material";

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
    if(!state[state.length - 1].districtPlanIds.includes(districtPlanId)){
      dispatch({
        type : GlobalTypes.AddDistrictPlan,
        payload  :{
          planId : districtPlanId
        }
      })
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
          <ScatterChart
            width={760}
            height={560}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
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
            textAlign: "center",
          }}
        >
          {axisLabels[0]}
        </div>
      </div>
    </div>
  );
}
