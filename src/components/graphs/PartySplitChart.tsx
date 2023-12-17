import { data } from "jquery";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import { fetchClusterSplits } from "../apiClient";
import { AvailableStates } from "../../globalContext";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface PartySplitChartProps {
  districtPlans: DistrictPlanData[];
}

interface Split {
  district_plan: string;
  splits: [number, number];
}

interface PartySplitData {
  type: string;
  clusterId: string;
  num_districts: number;
  splits: Split[];
}

export default function PartySplitChart({
  districtPlans,
}: PartySplitChartProps) {
  const [splitData, setSplitData] = useState<PartySplitData | null>(null);


  const { stateName, ensembleId, clusterId } = useParams<{
    stateName: AvailableStates;
    ensembleId: string;
    clusterId: string;
  }>();

  useEffect(() => {
    const currentState = stateName || AvailableStates.Unselected;
    const curClusterId = clusterId || "";
    async function getClusterSplitData() {
      try {
        const response = await fetchClusterSplits(currentState, curClusterId);
        if (response) {
          setSplitData(response);
        }
      } catch (error) {
        throw error;
      }
    }
    getClusterSplitData();
  }, []);

  const parseSplits = (party_splits: PartySplitData) => {
    return party_splits.splits.map((split) => {
      return {
        name: `${split.district_plan}`,
        Republican: Number(split.splits[0]),
        Democrat: Number(split.splits[1]),
      };
    });
  };
  return (
    splitData !== (null) ?  (
      <BarChart
        width={800}
        height={680}
        data={parseSplits(splitData)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0,splitData.num_districts]}>
          <Label
            style={{
              textAnchor: "middle",
              fontSize: "1rem",
              fill: "black",
            }}
            position={"insideLeft"}
            angle={270}
            value={"Number of Districts"}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="Democrat" stackId="a" fill="#4287f5" />
        <Bar dataKey="Republican" stackId="a" fill="#f54242" />
      </BarChart>
    ) : <CircularProgress/>
  );
}
