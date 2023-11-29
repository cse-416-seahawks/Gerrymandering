import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import "../css/ClusterTable.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
  TooltipProps,
  Label,
} from "recharts";
import { GlobalContext } from "../../globalContext";
import { ClusterData, ClusterPoints, CustomTooltipProps } from "../interfaces/AnalysisInterface";

interface ClusterScatterPlotProps {
    data: ClusterData[]
    data_points: ClusterPoints[],
    axis_labels: string[]
}

export default function MDSChart({ data, data_points, axis_labels } : ClusterScatterPlotProps) {
  const { state, dispatch } = useContext(GlobalContext);

  function handleStepChange(step: number) {
    dispatch({
      type: "STEP_CHANGE",
      payload: {
        step: step
      }
    })
  }

  const parseDomain = () => [
    500,
    Math.max(
      Math.max.apply(
        null,
        data_points.map((entry) => entry.num_district_plans)
      )
    ),
  ];

  const domain = parseDomain();
  const range = [100, 1000];

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const selectedPoint = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text"><b>{"Cluster: "}</b>{selectedPoint.cluster_num}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <ScatterChart
      width={760}
      height={630}
      margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name={axis_labels[0]}>
      <Label
        style={{
          textAnchor: "middle",
          fontSize: "0.5rem",
          fill: "black",
        }}
        value={"Coordinate 1"}
        position={"insideBottom"}
        offset={-30}
        
      />
      </XAxis>
      <YAxis
        yAxisId="left"
        type="number"
        dataKey="y"
        name={axis_labels[1]}
        opacity="1"
        stroke="#7aa9ff"
      >
        <Label
        style={{
          textAnchor: "middle",
          fontSize: "1rem",
          fill: "black",

        }}
        position={"insideLeft"}
        angle={270}
        value={"Coordinate 2"}
      />
      </YAxis>
      <ZAxis
        dataKey="num_district_plans"
        name="# District Plans"
        domain={domain}
        range={range}
      />
      <Tooltip
        content={<CustomTooltip />}
        cursor={{ strokeDasharray: "3 3" }}
        wrapperStyle={{ outline: "none" }}
        contentStyle={{ fontSize: 18 }}
      />
      <Scatter
        yAxisId="left"
        data={data_points}
        fill="#bfd6ff"
        stroke="#037cff"
        opacity={4}
        onClick={() => handleStepChange(2)}
      />
    </ScatterChart>
  );
}
