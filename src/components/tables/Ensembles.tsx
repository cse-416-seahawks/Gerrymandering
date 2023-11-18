import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import { Tabs, Tab, Pagination, TablePagination } from "@mui/material";
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
import { fetchEnsembleData } from "../apiClient";

interface EnsembleProps {
  showToggle : boolean,
  handleStep : (step : number, ensemble : number, ensembleId: string) => void
}

interface EnsembleData {
  ensemble: number,
  num_clusters: number,
  avg_dist_clusters: number,
  num_dist_plans: number,
}

const Ensembles: React.FC<EnsembleProps> = ({ showToggle, handleStep }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newMethod: string
  ) => {
    dispatch({
      type: "DISTANCE_MEASURE",
      payload: {
        distanceMeasure: newMethod,
      },
    });
  };

  const [currentTab, setCurrentTab] = useState("1");
  const [ensembleData, setEnsembleData] = useState<Array<EnsembleData>>([]);
  const [fetchedEnsembleData, setFetchedEnsembleData] = useState<any>({});
  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }

  let color;
  function randomColor() {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }

  useEffect(() => {
    const currState = state[state.length-1].currentState;
    const distanceMeasure = state[state.length-1].distanceMeasure;

    async function fetchStateEnsemble() {
      try {
        const response = await fetchEnsembleData(currState);
        const ensembles: Array<EnsembleData> = [];
        for (var row of response.ensembles) {
          const ensemble_table = row.data.find(
            (item: any) => item.distance_measure == distanceMeasure
          );
          ensembles.push({
            "ensemble": response.ensembles.indexOf(row) + 1,
            "num_clusters": ensemble_table.num_clusters,
            "num_dist_plans": row.num_district_plans,
            "avg_dist_clusters": ensemble_table.avg_distance,
          });
        }
        setFetchedEnsembleData(response);
        setEnsembleData(ensembles);
      } catch (error) {
        throw error;
      }
    }
    fetchStateEnsemble();
  }, [
    state[state.length - 1].currentState,
    state[state.length - 1].distanceMeasure,
  ]);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const spliceEnsemble = (ensembleData: Array<EnsembleData>, page: number) => {
    return ensembleData.slice((page - 1) * 7, page * 7);
  };
  return (
    <div>
      <div className="toggleButton-container">
        {
          showToggle && <ToggleButtonGroup
          exclusive
          value={state[state.length - 1].distanceMeasure}
          onChange={handleAlignment}
        >
          <ToggleButton value={"Hamming Distance"}> Hamming Distance </ToggleButton>
          <ToggleButton value={"Optimal Transport"}> Optimal Transport </ToggleButton>
          <ToggleButton value={"Total Variation"}> Total Variation Distance </ToggleButton>
        </ToggleButtonGroup>
        }
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
        {currentTab == "1" ? (
          <Pagination
            page={page}
            onChange={handleChange}
            sx={{ mt: "1rem" }}
            count={Math.floor(ensembleData.length / 7)}
          />
        ) : (
          <></>
        )}
        <TabPanel value="1">
          {spliceEnsemble(ensembleData, page).map((row) => (
            <Accordion defaultExpanded={row.ensemble == 1 ? true : false}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Button
                  variant="text"
                  size="large"
                  onClick={() => handleStep(1, row.ensemble, fetchedEnsembleData.ensembles[row.ensemble-1].ensemble_id)}
                >
                  Ensemble {row.ensemble}
                </Button>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <b>{"Numbers of clusters"}</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>{"Average distance between clusters"}</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>{"Number of district plans"}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">{row.num_clusters}</TableCell>
                      <TableCell align="center">
                        {row.avg_dist_clusters}
                      </TableCell>
                      <TableCell align="center">{row.num_dist_plans}</TableCell>
                    </TableRow>
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
};

export default Ensembles;
