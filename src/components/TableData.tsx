import React, {
  FC,
  useState,
  useContext,
  useEffect,
} from "react";
import "./css/TableData.css";
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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import StepContent from "@mui/material/StepContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {
  useMapEvent,
} from "react-leaflet";
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
import { NevadaDistrictContext } from "../NevadaContext";

interface DistrictSelectionProps {
  onDistrictSelection: (
    district_num: number,
    coordinates: Array<number>
  ) => void;
}
function TableData(props: {
  selectedState: string;
  onDistrictSelection: (
    district_num: number,
    coordinates: Array<number>
  ) => void;
}) {
  const [currentTab, setCurrentTab] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const { state, dispatch } = useContext(NevadaDistrictContext);
  const steps = [
    "Select an Ensemble",
    "Select a Cluster",
    "Select a District Plan",
  ];

  // When the state changes from the menu drop down, stepper should go to 'Select an Ensemble'
  useEffect(() => {
    handleStepChange(0);
  }, [props.selectedState]);

  function handleStepChange(step: number) {
    if (step === 2) {
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
    console.log("district map? " + state[0]);
    setCurrentTab(step);
  }

  function handleDistrictChange(district_num: number, coords: Array<number>) {
    console.log("again", coords);
    props.onDistrictSelection(district_num, coords);
  }

  /**
   *
   * Table Data for ensembles
   */
  const ensemble = [
    { label: "Numbers of clusters", detail: "7" },
    { label: "Average distance between clusters", detail: "12" },
    { label: "Number of district plans", detail: "200" },
  ];

  function Ensembles() {
    const [method, setMethod] = React.useState<string | null>('hamming');
    const handleAlignment = (
      event: React.MouseEvent<HTMLElement>,
      newMethod: string | null
    ) => {
      setMethod(newMethod);
    };
    return (
      <div>
        <ToggleButtonGroup className="distance-options-group" exclusive value={method} onChange={handleAlignment}>
          <ToggleButton value={"hamming"}> Hamming Distance </ToggleButton>
          <ToggleButton value={"optimal"}> Optimal Transport </ToggleButton>
          <ToggleButton value={"total"}>
            {" "}
            Total Variation Distance{" "}
          </ToggleButton>
        </ToggleButtonGroup>

        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Button
              variant="text"
              size="large"
              onClick={() => handleStepChange(1)}
            >
              Ensemble 1
            </Button>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {ensemble.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.label}{" "}
                    </TableCell>
                    <TableCell align="right">{row.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Button
              variant="text"
              size="large"
              onClick={() => handleStepChange(1)}
            >
              Ensemble 2
            </Button>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {ensemble.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.label}{" "}
                    </TableCell>
                    <TableCell align="right">{row.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Button
              variant="text"
              size="large"
              onClick={() => handleStepChange(1)}
            >
              Ensemble 3
            </Button>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {ensemble.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.label}{" "}
                    </TableCell>
                    <TableCell align="right">{row.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Button
              variant="text"
              size="large"
              onClick={() => handleStepChange(1)}
            >
              Ensemble 4
            </Button>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {ensemble.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.label}{" "}
                    </TableCell>
                    <TableCell align="right">{row.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Button
              variant="text"
              size="large"
              onClick={() => handleStepChange(1)}
            >
              Ensemble 5
            </Button>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {ensemble.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.label}{" "}
                    </TableCell>
                    <TableCell align="right">{row.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  /**
   *
   * Table Data for clusters
   */
  interface ClusterNameCellProps {
    name: string;
  }

  const ClusterNameCell: FC<ClusterNameCellProps> = ({ name }): JSX.Element => {
    const [editing, setEditing] = useState(false);
    const [clusterName, setName] = useState(name);
    const handleDoubleClick = () => {
      setEditing(true);
    };

    const handleBlur = () => {
      setEditing(false);
      // Save the changes or perform any required actions here
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setEditing(false);
      if (clusterName == "") setName(name);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
    return (
      <TableCell align="center" component="th" scope="row">
        {editing ? (
          <form
            className="form-control"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              className="cluster-name-input cluster-name-input-alt"
              value={clusterName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        ) : (
          <span className="cluster-name" onDoubleClick={handleDoubleClick}>
            {" "}
            {clusterName}
          </span>
        )}
      </TableCell>
    );
  };

  function ClusterTable() {
    const [currentTab, setCurrentTab] = useState("1");

    function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
      console.log(newValue);
      setCurrentTab(String(newValue));
    }

    interface cluster_summary_table {
      cluster: number;
      num_districts: number;
      average_dist: number;
    }

    const data01 = [
      { x: 100, y: 60, z: 200 },
      { x: 120, y: 30, z: 260 },
      { x: 170, y: 50, z: 400 },
      { x: 140, y: 35, z: 280 },
      { x: 150, y: 70, z: 500 },
      { x: 110, y: 58, z: 200 },
      { x: 140, y: 31, z: 280 },
      { x: 20, y: 40, z: 500 },
      { x: 16, y: 70, z: 200 },
      { x: 90, y: 20, z: 200 },
      { x: 45, y: 58, z: 200 },
      { x: 45, y: 91, z: 280 },
      { x: 20, y: 40, z: 500 },
      { x: 97, y: 70, z: 200 },
      { x: 94, y: 30, z: 200 },
      { x: 87, y: 29, z: 200 },
      { x: 89, y: 35, z: 200 },
    ];

    const parseDomain = () => [
      300,
      Math.max(
        Math.max.apply(
          null,
          data01.map((entry) => entry.y)
        )
      ),
    ];

    const domain = parseDomain();
    const range = [100, 1000];

    const clusterData = [
      {
        cluster: 1,
        name: "clusterA",
        num_dist_plans: 312,
        avg_distance: 12.2,
        avg_rep: "47%",
        avg_dem: "53%",
        avg_white: "72%",
        avg_black: "1%",
        avg_asian: "1%",
        avg_latino: "18%",
        other: "7%",
      },
      {
        cluster: 2,
        name: "clusterB",
        num_dist_plans: 126,
        avg_distance: 32.8,
        avg_rep: "31%",
        avg_dem: "69%",
        avg_white: "2%",
        avg_black: "18%",
        avg_asian: "15%",
        avg_latino: "18%",
        other: "47%",
      },
      {
        cluster: 3,
        name: "clusterC",
        num_dist_plans: 229,
        avg_distance: 12.2,
        avg_rep: "47%",
        avg_dem: "53%",
        avg_white: "72%",
        avg_black: "1%",
        avg_asian: "1%",
        avg_latino: "18%",
        other: "7%",
      },
      {
        cluster: 4,
        name: "clusterD",
        num_dist_plans: 581,
        avg_distance: 12.2,
        avg_rep: "47%",
        avg_dem: "53%",
        avg_white: "72%",
        avg_black: "1%",
        avg_asian: "1%",
        avg_latino: "18%",
        other: "7%",
      },
      {
        cluster: 5,
        name: "clusterE",
        num_dist_plans: 414,
        avg_distance: 12.2,
        avg_rep: "47%",
        avg_dem: "53%",
        avg_white: "72%",
        avg_black: "1%",
        avg_asian: "1%",
        avg_latino: "18%",
        other: "7%",
      },
    ];

    const clusterTempData = [
      {
        cluster: 1,
        name: "cluster A",
        data: [
          {
            name: "Number of Districts",
            value: "48",
          },
          {
            name: "Political Party Ratio",
            value: "68% Democratic / 32% Republican",
          },
          {
            name: "Average Republican Voters",
            value: "47%",
          },
          {
            name: "Average Democratic Voters",
            value: "53%",
          },
        ],
        distanceMeasures: [
          {
            name: "Optimal transport",
            value: "32.1",
          },
          {
            name: "Hamming distance",
            value: "21.2",
          },
          {
            name: "Total Variation Distance",
            value: "19.2",
          },
        ],
        demographicGroups: [
          // district average by racial group
          {
            name: "White",
            value: "31%",
          },
          {
            name: "Black",
            value: "32%",
          },
          {
            name: "Asian",
            value: "23%",
          },
          {
            name: "Other",
            value: "24%",
          },
        ],
      },
      {
        cluster: 2,
        name: "cluster B",
        data: [
          {
            name: "Number of Districts",
            value: "23",
          },
          {
            name: "Political Party Ratio",
            value: "32% Democratic / 68% Republican",
          },
          {
            name: "Average Republican Voters",
            value: "78%",
          },
          {
            name: "Average Democratic Voters",
            value: "22%",
          },
        ],
        distanceMeasures: [
          {
            name: "Optimal transport",
            value: "45.9",
          },
          {
            name: "Hamming distance",
            value: "17.4",
          },
          {
            name: "Total Variation Distance",
            value: "11",
          },
        ],
        demographicGroups: [
          // district average by racial group
          {
            name: "White",
            value: "31%",
          },
          {
            name: "Black",
            value: "32%",
          },
          {
            name: "Asian",
            value: "23%",
          },
          {
            name: "Other",
            value: "24%",
          },
        ],
      },
      {
        cluster: 3,
        name: "clusterC",
        data: [
          {
            name: "Number of Districts",
            value: "31",
          },
          {
            name: "Political Party Ratio",
            value: "56% Democratic / 44% Republican",
          },

          {
            name: "Average Republican Voters",
            value: "58%",
          },
          {
            name: "Average Democratic Voters",
            value: "42%",
          },
        ],
        demographicGroups: [
          // district average by racial group
          {
            name: "White",
            value: "31%",
          },
          {
            name: "Black",
            value: "32%",
          },
          {
            name: "Asian",
            value: "23%",
          },
          {
            name: "Other",
            value: "24%",
          },
        ],
        distanceMeasures: [
          {
            name: "Optimal transport",
            value: "8.8",
          },
          {
            name: "Hamming distance",
            value: "16.8",
          },
          {
            name: "Total Variation Distance",
            value: "15.1",
          },
        ],
      },
    ];

    const data = [];
    let a = Math.random() * 10;
    let b = Math.random() * 10;
    let c = Math.random() * 10;
    let d = Math.random() * 10;
    for (let i = 1; i <= 500; i++) {
      data.push({
        Num: i,
        ensemble1: Math.log(i) * 10,
        ensemble2: (Math.log(i) / Math.log(9)) * 10 + a,
        ensemble3: Math.log(i) / Math.log(8) + b,
        ensemble4: (Math.log(i) / Math.log(7)) * 10 + c,
        ensemble5: (Math.log(i) * 10) / Math.log(6) + d,
      });
    }

    let color;
    function randomColor() {
      color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      return color;
    }

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
                label="Graph Data"
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
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
                  {clusterData.map((row) => (
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
                      <TableCell align="center">
                        {" "}
                        {row.num_dist_plans}
                      </TableCell>
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
            <Accordion defaultExpanded={false}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {" "}
                <Typography>
                  <b>Association of clusters with ensemble size</b>
                </Typography>
              </AccordionSummary>
              <div className="graph-container">
                <AreaChart width={600} height={400} data={data}>
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
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {" "}
                <Typography>
                  <b>Cluster Graph</b>
                </Typography>
              </AccordionSummary>
              <div className="graph-container">
                <ScatterChart
                  width={500}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Average distance"
                  ></XAxis>
                  <YAxis
                    yAxisId="left"
                    type="number"
                    dataKey="y"
                    name="District plans in cluster"
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
                    data={data01}
                    fill="#bfd6ff"
                    stroke="#037cff"
                    opacity={4}
                  />
                </ScatterChart>
              </div>
            </Accordion>
          </TabPanel>
        </TabContext>

        {/* OLD VERSION OF OUR GUI */}
      </>
    );
  }

  function BackButton() {
    if (currentTab > 0) {
      // console.log("slay")
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => handleStepChange(currentTab - 1)}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      );
    }
    // console.log("not slay")
    return null;
  }

  return (
    <div className="table-container">
      <div className="stepper-container">
        <Stepper activeStep={currentTab}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={() => handleStepChange(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <BackButton />
      {/* State Details */}
      {currentTab == 0 && <Ensembles />}
      {/* Summary of Cluster */}
      {currentTab == 1 && <ClusterTable />}
      {/* <AverageMeasureTable/> <Party Affilations, Association of Clusters*/}
      {currentTab == 2 && (
        <AssociationClusters onDistrictSelection={handleDistrictChange} />
      )}
    </div>
  );
}

export default TableData;


function AssociationClusters({ onDistrictSelection }: DistrictSelectionProps) {
  interface cluster_summary_table {
    ensemble: number;
    num_clusters: number;
    plans_needed: number;
  }

  const [districtSelection, setDistrictSelection] = useState(0);
  const [coordinates, setCoordinates] = useState<Array<number>>([]);

  function handleDistrictChange(district_num: number, coords: Array<number>) {
    console.log("tabledata", coords);
    onDistrictSelection(district_num, coords);
    setCoordinates(coords);
    setDistrictSelection(district_num);
  }

  function SetMapView() {
    console.log("e", [coordinates[0], coordinates[1]]);
    const map = useMapEvent("mouseover", (e) => {
      map.setView([coordinates[0], coordinates[1]], 8, {});
      // map.setZoomAround([centerCoordinates[0], centerCoordinates[1]], 6);
    });

    return null;
  }

  const sampleData: cluster_summary_table[] = [
    { ensemble: 1, num_clusters: 3, plans_needed: 309 },
    { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
    { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
    { ensemble: 4, num_clusters: 5.3, plans_needed: 251 },
    { ensemble: 5, num_clusters: 6.3, plans_needed: 268 },
  ];

  interface district_summary_table {
    district: number;
    predicted_winner: string;
    democrat: number;
    republican: number;
    map_value: Array<number>;
  }
  const districts: district_summary_table[] = [
    {
      district: 1,
      predicted_winner: "Republican",
      democrat: 30,
      republican: 70,
      map_value: [35.5, -115],
    },
    {
      district: 2,
      predicted_winner: "Democrat",
      democrat: 60,
      republican: 40,
      map_value: [40.5, -115],
    },
    {
      district: 3,
      predicted_winner: "Democrat",
      democrat: 70,
      republican: 30,
      map_value: [38.5, -118], // -112 goes right and -115 goes left
    },
    {
      district: 4,
      predicted_winner: "Democrat",
      democrat: 55,
      republican: 45,
      map_value: [40.5, -118],
    },
    {
      district: 5,
      predicted_winner: "Republican",
      democrat: 34,
      republican: 66,
      map_value: [39.5, -120],
    },
  ];
  /**
   * Don't ask me how it's gonna work, I can't tell you, not because it's a secret, but because I don't know
   * @param coord
   * @returns
   */
  function goTo(coord: string) {
    console.log(coord);
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

  const sampleData1 = [
    { party: "Republican", men: "59%", women: "41%" },
    { party: "Democrat", men: "44%", women: "56%" },
  ];

  const sampleData2 = [
    {
      district: 1,
      white: "72%",
      black: "1%",
      asian: "1%",
      latino: "18%",
      other: "7%",
    },
    {
      district: 2,
      white: "35%",
      black: "37%",
      asian: "10%",
      latino: "12%",
      other: "6%",
    },
    {
      district: 3,
      white: "1%",
      black: "2%",
      asian: "3%",
      latino: "75%",
      other: "6%",
    },
    {
      district: 4,
      white: "44%",
      black: "14%",
      asian: "3%",
      latino: "29%",
      other: "10%",
    },
    {
      district: 5,
      white: "12%",
      black: "53%",
      asian: "25%",
      latino: "7%",
      other: "3%",
    },
  ];

  const data01 = [
    { x: 100, y: 60, z: 200 },
    { x: 120, y: 30, z: 260 },
    { x: 170, y: 50, z: 400 },
    { x: 140, y: 35, z: 280 },
    { x: 150, y: 70, z: 500 },
    { x: 110, y: 58, z: 200 },
    { x: 140, y: 31, z: 280 },
    { x: 20, y: 40, z: 500 },
    { x: 16, y: 70, z: 200 },
    { x: 90, y: 20, z: 200 },
    { x: 45, y: 58, z: 200 },
    { x: 45, y: 91, z: 280 },
    { x: 20, y: 40, z: 500 },
    { x: 97, y: 70, z: 200 },
    { x: 94, y: 30, z: 200 },
    { x: 87, y: 29, z: 200 },
    { x: 89, y: 35, z: 200 },
  ];
  const data02 = [
    { x: 133, y: 60, z: 200 },
    { x: 122, y: 30, z: 260 },
    { x: 111, y: 50, z: 400 },
    { x: 138, y: 35, z: 280 },
    { x: 177, y: 70, z: 500 },
    { x: 173, y: 58, z: 200 },
    { x: 179, y: 31, z: 280 },
    { x: 35, y: 40, z: 500 },
    { x: 11, y: 70, z: 200 },
    { x: 88, y: 20, z: 200 },
    { x: 45, y: 58, z: 200 },
    { x: 90, y: 91, z: 280 },
    { x: 20, y: 40, z: 500 },
    { x: 97, y: 70, z: 200 },
    { x: 94, y: 30, z: 200 },
    { x: 87, y: 29, z: 200 },
    { x: 89, y: 35, z: 200 },
  ];

  return (
    <>
      <div className="graph-container">
        <ScatterChart
          width={730}
          height={250}
          margin={{
            top: 20,
            right: 20,
            bottom: 10,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            name="% African American Population"
          />
          <YAxis dataKey="y" type="number" name="placeholder" />
          {/* <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" /> */}
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ fontSize: 18 }}
          />
          <Legend />
          <Scatter name="Available Data" data={data01} fill="#8884d8" />
          <Scatter name="Unavailable Data" data={data02} fill="#82ca9d" />
        </ScatterChart>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {" "}
          <Typography>
            <b>Districts</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ height: "10px", fontSize: "10px" }}>
                <TableRow>
                  <TableCell>District</TableCell>
                  <TableCell align="center">Predicted Winner</TableCell>
                  <TableCell align="right">% of Democratic Voters</TableCell>
                  <TableCell align="right">% of Republican Voters</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {districts.map((row) => (
                  <TableRow key={row.district}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {
                        <button
                          style={buttonStyle}
                          onClick={() =>
                            handleDistrictChange(row.district, row.map_value)
                          }
                        >
                          {row.district}
                        </button>
                      }{" "}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          row.predicted_winner === "Democrat" ? "blue" : "red",
                      }}
                      align="center"
                    >
                      {row.predicted_winner}
                    </TableCell>
                    <TableCell align="right">{row.democrat}%</TableCell>
                    <TableCell align="right">{row.republican}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <a href='https://www.nvsos.gov/sos/home/showpublisheddocument/12423/638318433762190000' target='_blank'>
                        <p style={{fontSize:"12px"}}>Data Referenced</p>
                    </a> */}
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {" "}
          <Typography>
            <b>Demographics</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ height: "10px", fontSize: "10px" }}>
                <TableRow>
                  <TableCell>District</TableCell>
                  <TableCell align="right">White</TableCell>
                  <TableCell align="right">Black</TableCell>
                  <TableCell align="right">Asian</TableCell>
                  <TableCell align="right">Latino</TableCell>
                  <TableCell align="right">Other</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sampleData2.map((row) => (
                  <TableRow key={row.district}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {
                        <button
                          style={buttonStyle}
                          onClick={() =>
                            handleDistrictChange(row.district, [34.5, -115])
                          }
                        >
                          {row.district}
                        </button>
                      }{" "}
                    </TableCell>
                    <TableCell align="right">{row.white}</TableCell>
                    <TableCell align="right">{row.black}</TableCell>
                    <TableCell align="right">{row.asian}</TableCell>
                    <TableCell align="right">{row.latino}</TableCell>
                    <TableCell align="right">{row.other}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <a href='https://www.nvsos.gov/sos/home/showpublisheddocument/12423/638318433762190000' target='_blank'>
                        <p style={{fontSize:"12px"}}>Data Referenced</p>
                    </a> */}
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {" "}
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
                {sampleData.map((row) => (
                  <TableRow key={row.ensemble}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.ensemble}{" "}
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
    </>
  );
}
