import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import {
  AvailableStates,
  GlobalContext,
  InfoCardType,
} from "../../globalContext";
import DistrictPlanScatterPlot from "../graphs/DistrictPlanScatterChart";
import ClusterDetailTable from "../tables/ClusterDetailTable";
import PartySplitChart from "../graphs/PartySplitChart";
import { fetchClusterDetailGraph, fetchClusterDetails } from "../apiClient";
import {
  DistrictPlanPoints,
  DistrictPlanData,
} from "../interfaces/AnalysisInterface";
import TypicalPlan from "../districts-map/TypicalPlan";
import SplitFreqChart from "../graphs/SplitFreqChart";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

interface ClusterDetailProps {
  currentState: AvailableStates;
  clusterId: string;
}
export default function ClusterDetail({
  currentState,
  clusterId,
}: ClusterDetailProps) {
  const { state, dispatch } = useContext(GlobalContext);

  const [currentTab, setCurrentTab] = useState(getCurrentTab());

  function getCurrentTab() {
    if (
      state[state.length - 1].currentInfoCard === InfoCardType.clusterSummary
    ) {
      return "1";
    } else if (state[state.length - 1].typicalPlan) {
      return "4";
    } else {
      return "2";
    }
  }

  const [tableData, setTableData] = useState<Array<DistrictPlanData>>([]);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [availableDataPoints, setAvailableDataPoints] = useState<
    Array<DistrictPlanPoints>
  >([]);
  const [unavailableDataPoints, setUnavailableDataPoints] = useState<
    Array<DistrictPlanPoints>
  >([]);
  const { centerCoordinates, zoom } =
    state[state.length - 1].mapData[currentState];

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }

  useEffect(() => {
    async function getClusterDetail() {
      try {
        const response = await fetchClusterDetails(currentState, clusterId);
        setTableData(response.data);
        dispatch({
          type: "SET_CLUSTER_DETAILS",
          payload: {
            clusterDetails: response.data,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    getClusterDetail();

    async function getClusterDetailGraph() {
      try {
        const response = await fetchClusterDetailGraph(currentState, clusterId);
        setAxisLabels([response.x_axis_label, response.y_axis_label]);
        setAvailableDataPoints(
          response.data.filter(
            (points: DistrictPlanPoints) => points.availableData
          )
        );
        setUnavailableDataPoints(
          response.data.filter(
            (points: DistrictPlanPoints) => !points.availableData
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    getClusterDetailGraph();
  }, []);

  function handleSummaryCard(): void {
    dispatch({
      type: "CHANGE_INFO_CARD",
      payload: {
        infoCardType: InfoCardType.clusterSummary,
      },
    });
  }

  function handlePlanCard(): void {
    dispatch({
      type: "CHANGE_INFO_CARD",
      payload: {
        infoCardType: InfoCardType.districtPlans,
      },
    });
  }

  const SetMapView = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([centerCoordinates[0], centerCoordinates[1]], zoom);
    }, [centerCoordinates[0], centerCoordinates[1]]);
    return null;
  };

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab
              value="1"
              label="Table View"
              sx={{ textTransform: "none" }}
              onClick={handleSummaryCard}
            />
            <Tab
              value="2"
              label="Graph View"
              sx={{ textTransform: "none" }}
              onClick={handlePlanCard}
            />
            <Tab
              value="3"
              label="Party Split"
              sx={{ textTransform: "none" }}
              onClick={handleSummaryCard}
            />
            <Tab
              value="4"
              label="Typical Plan"
              sx={{ textTransform: "none" }}
              onClick={handlePlanCard}
            />
          </Tabs>
        </Box>

        <TabPanel value="1">
          <ClusterDetailTable districtPlanData={tableData} />
        </TabPanel>
        <TabPanel value="2">
          <DistrictPlanScatterPlot
            axisLabels={axisLabels}
            availableData={availableDataPoints}
            unavailableData={unavailableDataPoints}
          />
        </TabPanel>
        <TabPanel value="3">
          <SplitFreqChart districtPlans={tableData} />
          <PartySplitChart districtPlans={tableData} />
        </TabPanel>
        <TabPanel value="4">
          <MapContainer
            id="mapid"
            center={[centerCoordinates[0], centerCoordinates[1]]}
            zoom={zoom}
            scrollWheelZoom={false}
            className="State-map"
            style={{ width: "100%", height: "70vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TypicalPlan clusterId={clusterId} />
            <SetMapView />
          </MapContainer>
        </TabPanel>
      </TabContext>
    </>
  );
}
