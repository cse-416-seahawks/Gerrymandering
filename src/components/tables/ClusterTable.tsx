import React, { useState, useContext } from "react";
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

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

function ClusterTable() {
  const [currentTab, setCurrentTab] = useState("1");

  const { state, dispatch } = useContext(GlobalContext);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    console.log(newValue);
    setCurrentTab(String(newValue));
  }

  function handleStepChange(step: number) {
    
    if (step === 2) {
      console.log("CHANGING TO DISTRICT MAP");
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

    console.log("step changed ", step);
  }

  const parseDomain = () => [
    300,
    Math.max(
      Math.max.apply(
        null,
        sampleData.data01.map((entry) => entry.y)
      )
    ),
  ];

  const domain = parseDomain();
  const range = [100, 1000];

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
            <Table sx={{ minWidth: 630, minHeight : 600, marginRight : 2 }}>
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
                  <TableCell align="center">Avg White Pop.</TableCell>
                  <TableCell align="center">Avg Black Pop.</TableCell>
                  <TableCell align="center">Avg Asian Pop.</TableCell>
                  <TableCell align="center">Avg Latino Pop.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleData.clusterData.map((row) => (
                  <TableRow key={row.cluster}>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        size="medium"
                        onClick={() => handleStepChange(2)}
                      >
                        {row.cluster}
                      </Button>
                    </TableCell>
                    <ClusterNameCell name={row.name} />
                    <TableCell align="center"> {row.num_dist_plans}</TableCell>
                    <TableCell align="center"> {row.avg_distance} </TableCell>
                    <TableCell align="center"> {row.avg_rep} </TableCell>
                    <TableCell align="center"> {row.avg_dem} </TableCell>
                    <TableCell align="center"> {row.avg_white} </TableCell>
                    <TableCell align="center"> {row.avg_black} </TableCell>
                    <TableCell align="center"> {row.avg_asian} </TableCell>
                    <TableCell align="center"> {row.avg_latino} </TableCell>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "460px",
                  }}
                >
                  <div
                    style={{
                      marginLeft : "1rem",
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: "1rem",
                      height: "120px",
                      width: "75px",
                    }}
                  >
                    African American Population In Districts (%)
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
                    name="Average African-American Population (%)"
                  ></XAxis>
                  <YAxis
                    yAxisId="left"
                    type="number"
                    dataKey="y"
                    name="African American Population In Districts (%)"
                    opacity="1"
                    stroke="#7aa9ff"
                  />
                  <ZAxis dataKey="y" domain={domain} range={range} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    wrapperStyle={{ outline: "none" }}
                    contentStyle={{ fontSize: 18 }}
                  />
                  <Scatter
                    yAxisId="left"
                    data={sampleData.data01}
                    fill="#bfd6ff"
                    stroke="#037cff"
                    opacity={4}
                    onClick={() => handleStepChange(2)}
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
                }}
              >
                Average African-American Population (%)
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
