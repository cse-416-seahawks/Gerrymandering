import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { GlobalContext, InfoCardType } from "../../globalContext";
import { ClusterSelectionProps } from "../tables/TableTypes";
import { fetchClusterSummaryData, fetchClusterGraphData } from "../apiClient";
import '../css/ClusterTable.css';
import ClusterTable from "../tables/ClusterTable";
import ClusterScatterPlot from "../graphs/ClusterScatterPlot";

interface ClusterData {
  cluster_number: number,
  cluster_id: string,
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

export default function ClusterSummary({onClusterSelection}: ClusterSelectionProps) {
  const [currentTab, setCurrentTab] = useState("1");
  const [clusterData, setClusterData] = useState<Array<ClusterData>>([]);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [dataPoints, setDataPoints] = useState<Array<ClusterPoints>>([]);
  const { state, dispatch } = useContext(GlobalContext);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }

  function handleStepChange(step: number, clusterId : string, clusterNumber?: number) {
    
    if (step === 2) { // Display selected cluster summary of district plans
      if (clusterNumber) onClusterSelection(clusterNumber, clusterId, clusterData[clusterNumber].district_plans);
    } 
    dispatch({
      type : "STEP_CHANGE",
      payload : {
        step : step
      }
    })

  }


  useEffect(() => {
    const currState = state[state.length-1].currentState;
    const ensembleId = state[state.length-1].ensembleId;
    const distanceMeasure = state[state.length-1].distanceMeasure;

    async function getClusterData() {
      try {
        const response = await fetchClusterSummaryData(currState, ensembleId, distanceMeasure);
        if (response) setClusterData(response.data);
      } catch(error) {
        throw error;
      }
    }
    getClusterData();

    async function getClusterGraphData() {
      try {
        const response = await fetchClusterGraphData(currState, ensembleId, distanceMeasure);
        if (response) {
          setAxisLabels([response.x_axis_label, response.y_axis_label]);
          setDataPoints(response.data);
        }
      } catch(error) {
        throw error;
      }
    }
    getClusterGraphData();

  }, [state[state.length-1].ensemble]);

  function handleSummaryCard(): void {
    dispatch({
      type : "CHANGE_INFO_CARD",
      payload : {
        infoCardType : InfoCardType.clusterSummary
      }
    })
  }

  function handlePlotOptions(): void {
    dispatch({
      type : "CHANGE_INFO_CARD",
      payload : {
        infoCardType : InfoCardType.clusterPlotOptions
      }
    })
  }

  return (
    <Box>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab
              value="1"
              label="Cluster Summary"
              sx={{ textTransform: "none" }}
              onClick={handleSummaryCard}
            />
            <Tab
              value="2"
              label="Cluster Graph"
              sx={{ textTransform: "none" }}
              onClick={handlePlotOptions}
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <ClusterTable clusters={clusterData} />
        </TabPanel>
        <TabPanel value="2">
          <ClusterScatterPlot data={clusterData} data_points={dataPoints} axis_labels={axisLabels}/>
        </TabPanel>
      </TabContext>

    </Box>
  );
}