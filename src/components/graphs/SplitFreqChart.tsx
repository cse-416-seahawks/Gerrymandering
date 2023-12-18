import { data } from "jquery";
import React, { PureComponent, useEffect, useState } from "react";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";
import { fetchClusterSplits } from "../apiClient";
import { AvailableStates } from "../../globalContext";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

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

  const frequencyMap: { [key: string]: number } = {};

  splitData?.splits.forEach((split) => {
    const key = split.splits.join(",");
    frequencyMap[key] = (frequencyMap[key] || 0) + 1;
  });

  const frequencyArray: { name: string; value: number }[] = Object.entries(
    frequencyMap
  ).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  console.log("frequency array", frequencyArray);

  const parseSplits = (party_splits: PartySplitData) => {
    return party_splits.splits.map((split) => {
      return {
        name: `${split.district_plan}`,
        Republican: Number(split.splits[0]),
        Democrat: Number(split.splits[1]),
      };
    });
  };
  return splitData !== null ? (
    <Box display="flex" justifyContent="center">
        <Typography align="center" variant="h6">Split Frequency</Typography>
    <PieChart
      series={[
        {
          data: frequencyArray.map((split, index) => ({
            id: index,
            value: split.value,
            label: `[${split.name}]`,
          })),
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={600}
      height={300}
    />
    </Box>
  ) : (
    <CircularProgress />
  );
}
