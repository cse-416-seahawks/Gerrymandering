import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import ClusterNameCell from "./ClusterNameCell";
import * as sampleData from "../SampleData";
import { GlobalContext } from "../../globalContext";
import { ClusterSelectionProps } from "./TableTypes";
import { fetchClusterData, fetchClusterGraphData } from "../apiClient";
import '../css/ClusterTable.css';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
  TooltipProps
} from "recharts";

interface ClusterData {
  cluster_number: number,
  name: string,
  num_dist_plans: number,
  avg_rep: string,
  avg_dem: string,
  avg_distance: number,
  demographics: ClusterDemographicData,
  district_plans: Array<string>,
          // avg_white: string,
          // avg_black: string,
          // avg_asian: string,
          // avg_latino: string,
          // avg_other: string,
  
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

function ClusterTable({onClusterSelection}: ClusterSelectionProps) {
  const [currentTab, setCurrentTab] = useState("1");
  const [clusterData, setClusterData] = useState<Array<ClusterData>>([]);
  const [axisLabels, setAxisLabels] = useState<Array<string>>([]);
  const [dataPoints, setDataPoints] = useState<Array<ClusterPoints>>([]);
  const { state, dispatch } = useContext(GlobalContext);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }

  function handleStepChange(step: number, clusterNumber?: number) {
    
    if (step === 2) { // Display selected cluster summary of district plans
      if (clusterNumber) onClusterSelection(clusterNumber, clusterData[clusterNumber].district_plans);
      dispatch({
        type: "DISTRICT_MAP",
        payload: {
          dismap: true,
        },
      });
    } else {
      dispatch({
        type: "STATE_MAP",
        payload: {
          dismap: false,
        },
      });
    }
    dispatch({
      type : "STEP_CHANGE",
      payload : {
        step : step
      }
    })

  }

  const parseDomain = () => [
    500,
    Math.max(
      Math.max.apply(
        null,
        dataPoints.map((entry) => entry.num_district_plans)
      )
    ),
  ];

  const domain = parseDomain();
  const range = [100, 1000];


  useEffect(() => {
    const currState = state[state.length-1].currentState;
    const ensembleId = state[state.length-1].ensembleId;
    const distanceMeasure = state[state.length-1].distanceMeasure;

    async function getClusterData() {
      try {
        const response = await fetchClusterData(currState, ensembleId, distanceMeasure);
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

  interface CustomTooltipProps extends TooltipProps<any, any> {
    active?: boolean;
    payload?: Array<{
      name: string; payload: {
        cluster_num: number; num_district_plans: number; x: number; y: number; id: string 
} 
}>;
  }
  
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      
      const selectedPoint = payload[0].payload;
      const xLabel = payload[0].name;
      const yLabel = payload[1].name;
      const zLabel = payload[2].name;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text"><b>{"Cluster: "}</b>{selectedPoint.cluster_num}</p>
          <p className="tooltip-text"><b>{`${xLabel}: `}</b>{selectedPoint.x}</p>
          <p className="tooltip-text"><b>{`${yLabel}: `}</b>{selectedPoint.y}</p>
          <p className="tooltip-text"><b>{`${zLabel}: `}</b>{selectedPoint.num_district_plans}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab
              value="1"
              label="Cluster Analysis"
              sx={{ textTransform: "none" }}
            />
            <Tab
              value="2"
              label="Cluster Data"
              sx={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <TableContainer className="cluster-table-container" component={Paper}>
            <Table size="small" style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cluster</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center"># District Plans</TableCell>
                  <TableCell align="center">
                    Avg Distance Between Plans
                  </TableCell>
                  <TableCell align="center">Avg Republican Voters</TableCell>
                  <TableCell align="center">Avg Democratic Voters</TableCell>
                  <TableCell align="center">Avg Caucasian Pop.</TableCell>
                  <TableCell align="center">Avg Afrian-American Pop.</TableCell>
                  <TableCell align="center">Avg Asian-American Pop.</TableCell>
                  <TableCell align="center">Avg Hispanic Pop.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clusterData.map((row) => (
                  <TableRow key={row.cluster_number}>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        size="medium"
                        onClick={() => handleStepChange(2, row.cluster_number)}
                      >
                        {row.cluster_number}
                      </Button>
                    </TableCell>
                    <ClusterNameCell name={row.name} />
                    <TableCell align="center"> {row.num_dist_plans}</TableCell>
                    <TableCell align="center"> {row.avg_distance} </TableCell>
                    <TableCell align="center"> {row.avg_rep} </TableCell>
                    <TableCell align="center"> {row.avg_dem} </TableCell>
                    <TableCell align="center"> {row.demographics.caucasian} </TableCell>
                    <TableCell align="center"> {row.demographics.african_american} </TableCell>
                    <TableCell align="center"> {row.demographics.asian_american} </TableCell>
                    <TableCell align="center"> {row.demographics.hispanic} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="2">
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <b>Cluster Graph</b>
              </Typography>
            </AccordionSummary>
            <div className="graph-container-row">
              <div className="graph-container">
                <div className="y-axis-container">
                  <div className="y-axis-label">
                    {/* Y-Axis label */}
                    {axisLabels[1]} 
                  </div>
                </div>


                <ScatterChart
                  width={740}
                  height={460}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name={axisLabels[0]} 
                  ></XAxis>
                  <YAxis
                    yAxisId="left"
                    type="number"
                    dataKey="y"
                    name={axisLabels[1]} 
                    opacity="1"
                    stroke="#7aa9ff"
                  />
                  <ZAxis dataKey="num_district_plans" name="# District Plans" domain={domain} range={range} />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ strokeDasharray: "3 3" }}
                    wrapperStyle={{ outline: "none" }}
                    contentStyle={{ fontSize: 18 }}
                  />
                  <Scatter
                    yAxisId="left"
                    data={dataPoints}
                    fill="#bfd6ff"
                    stroke="#037cff"
                    opacity={4}
                    onClick={(datapoint) => handleStepChange(2, datapoint.cluster_num)}
                  />
                </ScatterChart>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  width: "75%",
                  marginBottom: "1rem",
                  fontWeight: "700",
                  justifyContent: "end",
                  textAlign: 'center'
                }}
              >
                {/* X-Axis label */}
                {axisLabels[0]} 
              </div>
            </div>
          </Accordion>
        </TabPanel>
      </TabContext>

      {/* OLD VERSION OF OUR GUI */}
    </>
  );
}

export default ClusterTable;
