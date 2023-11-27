import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
} from "recharts";
import { GlobalContext } from "../../globalContext";
import { fetchClusterGraphData } from "../apiClient";

interface ClusterData {
    cluster_number: number,
    name: string,
    num_dist_plans: number,
    avg_rep: string,
    avg_dem: string,
    avg_distance: number,
    demographics: ClusterDemographicData,
    district_plans: Array<string>,
  }
  
  interface ClusterDemographicData {
    caucasian: number,
    african_american: number,
    asian_american: number,
    hispanic: number,
    other: number,
  }
  
  interface ClusterPoints {
    cluster_num: number,
    num_district_plans: number,
    x: number,
    y: number,
  }

interface ClusterScatterPlotProps {
    data : ClusterData[]
    data_points : ClusterPoints[],
    axis_labels : string[]

}

export default function ClusterScatterPlot({ data, data_points, axis_labels } : ClusterScatterPlotProps) {
  const { state, dispatch } = useContext(GlobalContext);

  function handleStepChange(step: number, clusterNumber?: number) {
    
    if (step === 2) { // Display selected cluster summary of district plans
    //   if (clusterNumber) onClusterSelection(clusterNumber, clusterData[clusterNumber].district_plans);
      dispatch({
        type: "DISTRICT_MAP",
        payload: {
          dismap: true,
        },
      });
    } else {
      dispatch({
        type: "STATE_MAP",
        payload: {
          dismap: false,
        },
      });
    }
    dispatch({
      type : "STEP_CHANGE",
      payload : {
        step : step
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



  interface CustomTooltipProps extends TooltipProps<any, any> {
    active?: boolean;
    payload?: Array<{
      name: string; payload: {
        cluster_num: number; num_district_plans: number; x: number; y: number; id: string 
} 
}>;
  }
  
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      
      const selectedPoint = payload[0].payload;
      const xLabel = payload[0].name;
      const yLabel = payload[1].name;
      const zLabel = payload[2].name;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text"><b>{"Cluster: "}</b>{selectedPoint.cluster_num}</p>
          <p className="tooltip-text"><b>{`${xLabel}: `}</b>{selectedPoint.x}</p>
          <p className="tooltip-text"><b>{`${yLabel}: `}</b>{selectedPoint.y}</p>
          <p className="tooltip-text"><b>{`${zLabel}: `}</b>{selectedPoint.num_district_plans}</p>
        </div>
      );
    }
  
    return null;
  };
  return (

          <ScatterChart
            width={740}
            height={460}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={axis_labels[0]}></XAxis>
            <YAxis
              yAxisId="left"
              type="number"
              dataKey="y"
              name={axis_labels[1]}
              opacity="1"
              stroke="#7aa9ff"
            />
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
              onClick={(datapoint) =>
                handleStepChange(2, datapoint.cluster_num)
              }
            />
          </ScatterChart>
  );
}
