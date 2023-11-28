import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMapEvent } from "react-leaflet";
import * as sampleData from "../SampleData";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import AlertModal from "../AlertModal";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { GlobalContext } from "../../globalContext";
import { DistrictSelectionProps, district_summary_table} from "../tables/TableTypes";
import DistrictPlanScatterPlot from "../graphs/DistrictPlanScatterPlot";
import ClusterDetailTable from "../tables/ClusterDetailTable";
import { DistrictPlanData } from "../interfaces/AnalysisInterface";

export default ({ onDistrictSelection }: DistrictSelectionProps) => {
    const [districtSelection, setDistrictSelection] = useState(0);
    const [coordinates, setCoordinates] = useState<Array<number>>([]);
    const [currentTab, setCurrentTab] = useState("1");
    const { state, dispatch } = useContext(GlobalContext);
    const [districtPlans, setDistrictPlans] = useState<Array<DistrictPlanData>>([]);

    function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
      setCurrentTab(String(newValue));
    }

    function handleDistrictChange(district_num: number, coords: Array<number>) {
      onDistrictSelection(district_num, coords);
      // setCoordinates(coords);
      setDistrictSelection(district_num);
    }
  
    function SetMapView() {
      const map = useMapEvent("mouseover", (e) => {
        map.setView([coordinates[0], coordinates[1]], 8, {});
        // map.setZoomAround([centerCoordinates[0], centerCoordinates[1]], 6);
      });
  
      return null;
    }
  
    useEffect(() => {
      
      async function fetchDistrictData() {
        
        try {
          const currState = state[state.length-1].currentState;
          const districtPlanIds = state[state.length-1].districtPlanIds;
          
          // const response = await fetchDistrictPlanData(currState, districtPlanIds);
          // setDistrictPlans(response.data);
        } catch(error) {
          throw error;
        }
      }
      fetchDistrictData();
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
            </Tabs>
          </Box>
          <TabPanel value="1">
            <DistrictPlanScatterPlot district_plans={districtPlans}/>
          </TabPanel>
          <TabPanel value="2">
            <ClusterDetailTable districtChange={handleDistrictChange}/>
          </TabPanel>
        </TabContext>
    
      </>
    );
  }
  