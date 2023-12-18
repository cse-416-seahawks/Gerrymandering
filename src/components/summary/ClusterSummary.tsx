import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { AvailableStates, GlobalContext, InfoCardType } from "../../globalContext";
import { fetchClusterSummaryData, fetchClusterSummaryGraphData } from "../apiClient";
import '../css/ClusterTable.css';
import ClusterTable from "../tables/ClusterTable";
import ClusterScatterPlot from "../graphs/CustomScatterChart";
import MDSChart from "../graphs/MDSChart";
import { ClusterData, ClusterPoints } from "../interfaces/AnalysisInterface";
import { useLocation } from "react-router-dom";


interface ClusterSummaryProps {
  currentState : AvailableStates,
  ensembleId : string,
  onClusterSelection: (
    cluster: ClusterData,
  ) => void;
}

export default function ClusterSummary({currentState, onClusterSelection, ensembleId}: ClusterSummaryProps) {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("1");
  const [clusterData, setClusterData] = useState<Array<ClusterData>>([]);
  const { state, dispatch } = useContext(GlobalContext);
  

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }

  function setClusterSelection(clusterTableProps: any) {
    onClusterSelection(clusterTableProps);
  }

  useEffect(() => {
    const distanceMeasure = state[state.length-1].distanceMeasure;
    async function getClusterData() {
      try {
        const response = await fetchClusterSummaryData(currentState, ensembleId, distanceMeasure);
        if (response) setClusterData(response.data);
      } catch(error) {
        throw error;
      }
    }
    getClusterData();

  }, [state[state.length-1].ensemble]);

  function handleSummaryCard(): void {
    dispatch({
      type : "CHANGE_INFO_CARD",
      payload : {
        infoCardType : InfoCardType.ensembleSummary
      }
    })
  }

  function handlePlotOptions(): void {
    dispatch({
      type: "CHANGE_INFO_CARD",
      payload: {
        infoCardType: InfoCardType.clusterPlotOptions
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
              label="MDS Graph"
              sx={{ textTransform: "none" }}
              onClick={handleSummaryCard}
            />
            <Tab
              value="3"
              label="Custom Graph"
              sx={{ textTransform: "none" }}
              onClick={handlePlotOptions}
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <ClusterTable currentState={currentState} ensembleId={ensembleId} clusters={clusterData} onClusterSelection={setClusterSelection}/>
        </TabPanel>
        <TabPanel value="2">
          <MDSChart currentState={currentState} ensembleId={ensembleId} data={clusterData} />
        </TabPanel>
        <TabPanel value="3">
          <ClusterScatterPlot currentState={currentState} ensembleId={ensembleId} data={clusterData}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}