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

import { AvailableStates, GlobalContext, InfoCardType } from "../../globalContext";
import BubbleChart from "react-apexcharts"
import { ClusterData, ClusterPoints } from "../interfaces/AnalysisInterface";
import { fetchClusterSummaryGraphData } from "../apiClient";
import { ApexOptions } from "apexcharts";


interface ClusterScatterPlotProps {
  currentState : AvailableStates,
  ensembleId : string,
  data: ClusterData[];
}

export default function ClusterScatterPlot({ currentState, ensembleId, data }: ClusterScatterPlotProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [dataPoints, setDataPoints] = useState<Array<ClusterPoints>>([]);

  useEffect(() => {
    const {distanceMeasure} = state[state.length - 1];

    async function getClusterSummaryGraphData() {
      try {
        const response = await fetchClusterSummaryGraphData(
          currentState,
          ensembleId,
          distanceMeasure
        );
        if (response) {
          setAxisLabels([response.x_axis_label, response.y_axis_label]);
          setDataPoints(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
    getClusterSummaryGraphData();
  }, [state[state.length - 1].ensemble]);

  const handleClick = (point: ClusterPoints, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const clickedPoint = point
  };

  const clusterGraphData = (dataPoints : ClusterPoints[]) => {
    return dataPoints.map((cluster) => ({
      name : `Cluster ${cluster.cluster_num}`,
      data : [{
        x : cluster.x,
        y : cluster.y,
        z : cluster.num_district_plans
      }]
    }))
  }

  // const parseDomain = () => [
  //   500,
  //   Math.max(
  //     Math.max.apply(
  //       null,
  //       dataPoints.map((entry) => entry.num_district_plans)
  //     )
  //   ),
  // ];

  // const domain = parseDomain();
  // const range = [100, 1000];

  interface CustomTooltipProps extends TooltipProps<any, any> {
    active?: boolean;
    payload?: Array<{
      name: string;
      payload: {
        cluster_num: number;
        num_district_plans: number;
        x: number;
        y: number;
        id: string;
      };
    }>;
  }

  const options: ApexOptions ={
    chart: {
        height: 350,
        type: 'bubble',
        toolbar: {
          show: false,
        },
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        opacity: 0.8
    },
    title: {
        text: 'Simple Bubble Chart'
    },
    xaxis: {
        tickAmount: 0.1,
        type: 'category',
    },
    yaxis: {
        max: 70
    }
  }


  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const selectedPoint = payload[0].payload;
      const xLabel = payload[0].name;
      const yLabel = payload[1].name;
      const zLabel = payload[2].name;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text">
            <b>{"Cluster: "}</b>
            {selectedPoint.cluster_num}
          </p>
          <p className="tooltip-text">
            <b>{`${xLabel}: `}</b>
            {selectedPoint.x}
          </p>
          <p className="tooltip-text">
            <b>{`${yLabel}: `}</b>
            {selectedPoint.y}
          </p>
          <p className="tooltip-text">
            <b>{`${zLabel}: `}</b>
            {selectedPoint.num_district_plans}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <BubbleChart options={options} series={clusterGraphData(dataPoints)}/>
  );
}
