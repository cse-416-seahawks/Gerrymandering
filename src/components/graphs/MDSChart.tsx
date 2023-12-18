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
import {
  AvailableStates,
  GlobalContext,
  GlobalTypes,
  InfoCardType,
} from "../../globalContext";
import { ClusterData, ClusterPoints } from "../interfaces/AnalysisInterface";
import { fetchMDSClusterGraphData } from "../apiClient";
import { useNavigate } from "react-router-dom";

interface ClusterScatterPlotProps {
  currentState: AvailableStates;
  ensembleId: string;
  data: ClusterData[];
}

export default function MDSChart({
  currentState,
  data,
  ensembleId,
}: ClusterScatterPlotProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [dataPoints, setDataPoints] = useState<Array<ClusterPoints>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const distanceMeasure = state[state.length - 1].distanceMeasure;

    async function getClusterSummaryGraphData() {
      try {
        const response = await fetchMDSClusterGraphData(
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

  const parseDomain = () => [
    500,
    Math.max(
      Math.max.apply(
        null,
        dataPoints.map((entry) => entry.num_district_plans)
      )
    ),
  ];

  const domain = parseDomain();
  const range = [100, 1000];

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

  const selectCluster = (clusterNum : number) => {
    const selectedCluster = data.find((cluster) => cluster.cluster_number === clusterNum);
    if (selectedCluster) {
      dispatch([
        {
          type: GlobalTypes.ChangeCard,
          payload: {
            infoCardType: InfoCardType.clusterSummary,
          },
        },
        {
          type: GlobalTypes.SetCluster,
          payload: {
            cluster: clusterNum,
            clusterPlanIds: selectedCluster.district_plans,
          },
        },
      ]);
      const currentPathname = window.location.pathname;
      navigate(`${currentPathname}/cluster/${selectedCluster.cluster_id}`);
    }
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const selectedPoint = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text">
            <b>{"Cluster: "}</b>
            {selectedPoint.cluster_num}
          </p>
          <p className="tooltip-text">
            <b>{"# District Plans: "}</b>
            {selectedPoint.num_district_plans}
          </p>
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
      <XAxis type="number" dataKey="x" name={axisLabels[0]}>
        <Label
          style={{
            textAnchor: "middle",
            fontSize: "0.5rem",
            fill: "black",
          }}
          value={axisLabels[0]}
          position={"insideBottom"}
          offset={-30}
        />
      </XAxis>
      <YAxis
        yAxisId="left"
        type="number"
        dataKey="y"
        name={axisLabels[1]}
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
          value={axisLabels[1]}
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
      {dataPoints.map((cluster) => (
        <Scatter
          yAxisId="left"
          data={[cluster]}
          fill="#bfd6ff"
          stroke="#037cff"
          opacity={4}
          onClick={() => {
            selectCluster(cluster.cluster_num)
          }}
        />
      ))}
    </ScatterChart>
  );
}
