import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { DistrictSelectionProps, district_summary_table} from "./TableTypes";
import { fetchClusterDetails } from "../apiClient";

interface DistrictPlanData {
  district_plan: number,
  opportunity_districts: number,
  democrat: string,
  republican: string,
}

export default ({ onDistrictSelection }: DistrictSelectionProps) => {
    const [districtSelection, setDistrictSelection] = useState(0);
    const [coordinates, setCoordinates] = useState<Array<number>>([]);
    const [currentTab, setCurrentTab] = useState("1");
    const [displayedDistrictPlans, setDisplayedDistrictPlans] = useState<Array<district_summary_table>>([]);
    const [modal, setModal] = useState<boolean>(false);
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
  
    
    
    /**
     * Don't ask me how it's gonna work, I can't tell you, not because it's a secret, but because I don't know
     * @param coord
     * @returns
     */
    function goTo(coord: string) {
      return coord;
    }
    const buttonStyle = {
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    };

    function handleDistrictSelection(point: any) {
      const plan = {
        district_plan: point.z,
        opportunity_districts: 5,
        democrat: '30%',
        republican: '70%',
        map_value: [35.5, -115],
      };
      if (!displayedDistrictPlans.some((item) => item.district_plan === plan.district_plan)) {
        setDisplayedDistrictPlans([...displayedDistrictPlans, plan]);
      }
    }
    
    function removeSelectedDistrictPlan(districtPlanNum: number) {
      const selected = displayedDistrictPlans.map(item => { return item; });
      const newSelected = selected.filter((item) => item.district_plan !== districtPlanNum);
      setDisplayedDistrictPlans(newSelected);
    }

    function handleOpenModal(open: boolean) {
      setModal(open);
    }


    useEffect(() => {
      async function fetchDistrictData() {
        try {
          console.log("EEE", state)
          const currState = state[state.length-1].currentState;
          const districtPlanIds = state[state.length-1].districtPlanIds;
          
          // const response = await fetchClusterDetails(currState, districtPlanIds);
          // setDistrictPlans(response.data);
        } catch(error) {
          throw error;
        }
      }
      fetchDistrictData();
    }, []);

    return (
      <>
        <AlertModal openCallBack={handleOpenModal} isOpen={modal}/>
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
            <div className="graph-container-row">
              <div className="graph-container">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "350px", }}>
                  <div style={{ fontWeight: "700", textAlign: "center", fontSize: "1.0rem", height: "100px", width: "60px", }}>
                    {"# Districts w/ African American Population > 5,000,000"}
                  </div>
                </div>
                <ScatterChart width={800}  height={350} margin={{ top: 20, right: 20, bottom: 10, left: 10, }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <ZAxis dataKey="z" type="number" name="District Plan" />
                  <XAxis dataKey="x" type="number" name="Average African-American Population (%)"/>
                  <YAxis dataKey="y" type="number" name="# Districts w/ African American Population > 5,000,000" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{ fontSize: 18 }}
                  />
                  <Legend/>
                  <Scatter name="Available Data" data={sampleData.data01} fill="#82ca9d" onClick={handleDistrictSelection}/>
                  <Scatter name="Unavailable Data" data={sampleData.data02} fill="#ca8287" onClick={() => handleOpenModal(true)}/>
                </ScatterChart>
              </div>
              <div style={{ display: "flex", fontSize: "1.0rem", width: "65%", margin: "2rem", fontWeight: "700", justifyContent: "end", }}>
                {"Average African-American Population (%)"}
              </div>
            </div>
            {/* 
              SELECTED 
              DISTRICT 
              PLANS
            */}
            <TableContainer className="plan-table-container" component={Paper}>
            <div style={{  width:'100%', maxHeight: 300, overflow: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">District Plan</TableCell>
                    <TableCell align="center"># Opportunity Districts</TableCell>
                    <TableCell align="center">Avg Republican %</TableCell>
                    <TableCell align="center">Avg Democratic %</TableCell>
                  </TableRow>
                </TableHead>
                {displayedDistrictPlans.length == 0 ? 
                <>
                  <TableCell component="th" scope="row" width='100rem'></TableCell>
                  <TableCell component="th" scope="row" width='100rem' ></TableCell>
                  <div style={{ fontSize: '1.2rem', fontWeight: 500, color: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>
                    No selected district plans
                  </div>
                </>
                :
                <>
                  <TableBody>
                  {displayedDistrictPlans.map((row) => (
                      <TableRow key={row.district_plan} onDoubleClick={() => removeSelectedDistrictPlan(row.district_plan)}>
                        <TableCell align="center">{row.district_plan}</TableCell>
                        <TableCell align="center">{row.opportunity_districts}</TableCell>
                        <TableCell align="center">{row.democrat}</TableCell>
                        <TableCell align="center">{row.republican}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </>
                }
              </Table>
            </div>
            </TableContainer>
          </TabPanel>
          {/* 
                TABLE VIEW 
          */}
          <TabPanel value="2">
            <TableContainer className="plan-table-container" component={Paper}>
              <Table sx={{ minWidth: 630, minHeight : 200, marginRight : 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">District Plan</TableCell>
                    <TableCell align="center"># Opportunity Districts</TableCell>
                    <TableCell align="center">Avg Republican %</TableCell>
                    <TableCell align="center">Avg Democratic %</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleData.district_plan_data.map((row) => ( // districtPlans
                      <TableRow key={row.district_plan}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {
                            <button
                              style={buttonStyle}
                              onClick={() =>
                                handleDistrictChange(row.district_plan, [-1,-1]) // change to map value
                              }
                            >
                              {row.district_plan}
                            </button>
                          }{" "}
                        </TableCell>
                        <TableCell align="center">{row.opportunity_districts}</TableCell>
                        <TableCell align="center">{row.democrat}</TableCell>
                        <TableCell align="center">{row.republican}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
    
      </>
    );
  }
  