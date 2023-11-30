import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { GlobalContext } from "../../globalContext";
import { DistrictSelectionProps } from "../tables/TableTypes";
import DistrictPlanScatterPlot from "../graphs/DistrictPlanScatterChart";
import ClusterDetailTable from "../tables/ClusterDetailTable";
import PartySplitChart from "../graphs/PartySplitChart";
import { fetchClusterDetailGraph, fetchClusterDetails } from "../apiClient";
import { DistrictPlanData, DistrictPlanPoints } from "../interfaces/AnalysisInterface";

export default ({ onDistrictSelection }: DistrictSelectionProps) => {
  const [currentTab, setCurrentTab] = useState("1");
  const { state, dispatch } = useContext(GlobalContext);
  const [tableData, setTableData] = useState<Array<DistrictPlanData>>([]);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [availableDataPoints, setAvailableDataPoints] = useState<Array<DistrictPlanPoints>>([]);
  const [unavailableDataPoints, setUnavailableDataPoints] = useState<Array<DistrictPlanPoints>>([]);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }

  function handleDistrictChange(district_num: number, coords: Array<number>) {
    onDistrictSelection(district_num, coords);
  }

  useEffect(() => {
    const currState = state[state.length - 1].currentState;
    const currClusterId = state[state.length - 1].clusterId;

    async function getClusterDetail() {
      try {
        const response = await fetchClusterDetails(currState, currClusterId);
        setTableData(response.data);
        dispatch({
          type: "SET_CLUSTER_DETAILS",
          payload: {
            clusterDetails: response.data,
          }
        })
      } catch(error) {
        console.log(error);
      }
    }
    getClusterDetail();

    async function getClusterDetailGraph() {
      try {
        const response = await fetchClusterDetailGraph(currState, currClusterId);
        setAxisLabels([response.x_axis_label, response.y_axis_label]);
        setAvailableDataPoints(response.data.filter((points: DistrictPlanPoints) => points.availableData));
        setUnavailableDataPoints(response.data.filter((points: DistrictPlanPoints) => !points.availableData));
      } catch(error) {
        console.log(error);
      }
    }
    getClusterDetailGraph();
  }, []);

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab
              value="1"
              label="Graph View"
              sx={{ textTransform: "none" }}
            />
            <Tab
              value="2"
              label="Table View"
              sx={{ textTransform: "none" }}
            />
              <Tab
              value="3"
              label="Party Split"
              sx={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <DistrictPlanScatterPlot axisLabels={axisLabels} availableData={availableDataPoints} unavailableData={unavailableDataPoints}/>
        </TabPanel>
        <TabPanel value="2">
          <ClusterDetailTable districtPlanData={tableData} districtChange={handleDistrictChange}/>
        </TabPanel>
        <TabPanel value="3">
          <PartySplitChart/>
        </TabPanel>
      </TabContext>
    </>
  );
}
  