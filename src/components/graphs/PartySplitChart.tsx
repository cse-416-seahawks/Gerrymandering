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
  Brush,
} from "recharts";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import { fetchClusterSplits } from "../apiClient";
import { AvailableStates } from "../../globalContext";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

interface PartySplitChartProps {
  districtPlans: DistrictPlanData[];
}

interface Split {
  district_plan: string;
  num_districts : number;
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
    return party_splits.splits.map((split, index) => {
      return {
        name: `${index + 1}`,
        Republican: Number(split.splits[1]),
        Democrat: Number(split.splits[0]),
      };
    });
  };
  return (
    splitData !== (null) ?  (
      <Box>
        <Typography fontSize="1.2rem" variant="h6" align="left">Splits Visual</Typography>
      <BarChart
        width={800}
        height={300}
        data={parseSplits(splitData)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0,splitData.splits[0].num_districts]}>
          <Label
            style={{
              textAnchor: "middle",
              fontSize: "70%",
            }}
            position={"insideLeft"}
            angle={270}
            value={"# of Districts"}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="Democrat" stackId="a" fill="#4287f5" />
        <Bar dataKey="Republican" stackId="a" fill="#f54242" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </BarChart>
      </Box>
    ) : <CircularProgress/>
  );
}
