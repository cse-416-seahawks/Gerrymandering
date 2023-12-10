import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { GlobalContext, InfoCardType } from "../../globalContext";
import { fetchClusterSummaryData, fetchClusterSummaryGraphData } from "../apiClient";
import '../css/ClusterTable.css';
import ClusterTable from "../tables/ClusterTable";
import ClusterScatterPlot from "../graphs/ClusterScatterChart";
import MDSChart from "../graphs/MDSChart";
import { ClusterData, ClusterPoints } from "../interfaces/AnalysisInterface";


interface ClusterSummaryProps {
  onClusterSelection: (
    cluster: ClusterData,
  ) => void;
}

export default function ClusterSummary({onClusterSelection}: ClusterSummaryProps) {
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
          <ClusterTable clusters={clusterData} onClusterSelection={setClusterSelection}/>
        </TabPanel>
        <TabPanel value="2">
          <MDSChart data={clusterData} />
        </TabPanel>
        <TabPanel value="3">
          <ClusterScatterPlot data={clusterData}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}