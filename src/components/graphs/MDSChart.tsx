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
import { GlobalContext, InfoCardType } from "../../globalContext";
import { ClusterData, ClusterPoints } from "../interfaces/AnalysisInterface";
import { fetchMDSClusterGraphData } from "../apiClient";

interface ClusterScatterPlotProps {
  data: ClusterData[];
}

export default function MDSChart({ data }: ClusterScatterPlotProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [dataPoints, setDataPoints] = useState<Array<ClusterPoints>>([]);

  useEffect(() => {
    const currState = state[state.length - 1].currentState;
    const ensembleId = state[state.length - 1].ensembleId;
    const distanceMeasure = state[state.length - 1].distanceMeasure;

    async function getClusterSummaryGraphData() {
      try {
        const response = await fetchMDSClusterGraphData(
          currState,
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

  function handleStepChange(step: number) {
    if (step === 2) {
      dispatch([
        {
          type: "CHANGE_INFO_CARD",
          payload: {
            infoCardType: InfoCardType.districtPlans,
          },
        },
        {
          type: "STEP_CHANGE",
          payload: {
            step: step,
          },
        },
      ]);
    } else {
      dispatch({
        type: "STEP_CHANGE",
        payload: {
          step: step,
        },
      });
    }
  }

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
      <Scatter
        yAxisId="left"
        data={dataPoints}
        fill="#bfd6ff"
        stroke="#037cff"
        opacity={4}
        onClick={() => handleStepChange(2)}
      />
    </ScatterChart>
  );
}
