import React, { FC, useState, useContext, useEffect } from "react";
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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import * as sampleData from "../SampleData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { GlobalContext } from "../../globalContext";

interface EnsembleProps {
  showToggle : boolean,
  handleStep : (step : number) => void
}

const Ensembles : React.FC<EnsembleProps> = ({ showToggle, handleStep}) => {
  const { state, dispatch } = useContext(GlobalContext);
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newMethod: string
  ) => {
    console.log("hise", newMethod);
    dispatch({
      type: "DISTANCE_MEASURE",
      payload: {
        distanceMeasure: newMethod,
      },
    });
  };

  const [currentTab, setCurrentTab] = useState("1");

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    console.log(newValue);
    setCurrentTab(String(newValue));
  }


  let color;
  function randomColor() {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }

  return (
    <div>
      <div className="toggleButton-container">
        <ToggleButtonGroup
          exclusive
          value={state[state.length - 1].distanceMeasure}
          onChange={handleAlignment}
        >
          <ToggleButton value={"hamming"}> Hamming Distance </ToggleButton>
          <ToggleButton value={"optimal"}> Optimal Transport </ToggleButton>
          <ToggleButton value={"total"}>
            {" "}
            Total Variation Distance{" "}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab
              value="1"
              label="Ensemble Selection"
              sx={{ textTransform: "none" }}
            />
            <Tab
              value="2"
              label="Ensemble Data"
              sx={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          {sampleData.sampleEnsembleData.map((row) => (
            <Accordion defaultExpanded={row.expanded}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Button
                  variant="text"
                  size="large"
                  onClick={() => handleStep(1)}
                >
                  Ensemble {row.ensemble}
                </Button>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                  <TableBody>
                    {row.data.map((tablerow) => (
                      <TableRow key={tablerow.label}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {tablerow.label}{" "}
                        </TableCell>
                        <TableCell align="right">{tablerow.detail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))}
          <br />
        </TabPanel>
        <TabPanel value="2">
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {" "}
              <Typography>
                <b>Association of clusters with ensemble size</b>
              </Typography>
            </AccordionSummary>
            <div className="graph-container">
              <AreaChart
                width={600}
                height={400}
                data={sampleData.ensembleData_2}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Num" />
                <YAxis />
                <Tooltip contentStyle={{ fontSize: 18 }} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="ensemble1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="ensemble2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="ensemble3"
                  stroke={randomColor()}
                  fill={color}
                />
                <Area
                  type="monotone"
                  dataKey="ensemble4"
                  stroke={randomColor()}
                  fill={color}
                />
                <Area
                  type="monotone"
                  dataKey="ensemble5"
                  stroke={randomColor()}
                  fill={color}
                />
                {/*
                                Dev note, remember, all of this is not dynamic yet, so it's yet to be implemented with
                                data, so this is will still need fixes before this is ready.
                                */}
              </AreaChart>
            </div>
          </Accordion>
          <Accordion defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <b>Details about the ensembles</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ height: "10px", fontSize: "10px" }}>
                    <TableRow>
                      <TableCell>Ensemble</TableCell>
                      <TableCell align="right"># of clusters at 500</TableCell>
                      <TableCell align="right">
                        Plans needed to reach max clusters
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {sampleData.Data3.map((row) => (
                      <TableRow key={row.ensemble}>
                        <TableCell component="th" scope="row">
                          {row.ensemble}
                        </TableCell>
                        <TableCell align="right">{row.num_clusters}</TableCell>
                        <TableCell align="right">{row.plans_needed}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default Ensembles;
