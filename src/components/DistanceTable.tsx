import React, { useState, useContext } from "react";
import "./css/Distance.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import "./css/TableData.css";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DistanceGraph from "./DistanceGraph";
import { NevadaDistrictContext } from "../NevadaContext";
import { Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DistanceTable() {
  const steps = ["Select an Ensemble", "Compare Distance Measures"];
  const [currentTab, setCurrentTab] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const { state, dispatch } = useContext(NevadaDistrictContext);

  function handleStepChange(step: number) {
    if (step === 1) {
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
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let ensembleData = [
    {
      ensemble: 1,
      data: [
        { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
        {
          label: "Average distance between clusters",
          detail: getRandomNumber(12.1, 62.1),
        },
        {
          label: "Number of district plans",
          detail: getRandomNumber(500, 1000),
        },
      ],
      expanded: true,
    },
    {
      ensemble: 2,
      data: [
        { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
        {
          label: "Average distance between clusters",
          detail: getRandomNumber(12.1, 62.1),
        },
        {
          label: "Number of district plans",
          detail: getRandomNumber(500, 1000),
        },
      ],
    },
    {
      ensemble: 3,
      data: [
        { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
        {
          label: "Average distance between clusters",
          detail: getRandomNumber(12.1, 62.1),
        },
        {
          label: "Number of district plans",
          detail: getRandomNumber(500, 1000),
        },
      ],
    },
    {
      ensemble: 4,
      data: [
        { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
        {
          label: "Average distance between clusters",
          detail: getRandomNumber(12.1, 62.1),
        },
        {
          label: "Number of district plans",
          detail: getRandomNumber(500, 1000),
        },
      ],
    },
    {
      ensemble: 5,
      data: [
        { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
        {
          label: "Average distance between clusters",
          detail: getRandomNumber(12.1, 62.1),
        },
        {
          label: "Number of district plans",
          detail: getRandomNumber(500, 1000),
        },
      ],
    },
  ];

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

  function Ensembles() {
    const { state, dispatch } = useContext(NevadaDistrictContext);
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

    interface ensemble_summary_table {
      ensemble: number;
      num_clusters: number;
      plans_needed: number;
    }

    const sampleData: ensemble_summary_table[] = [
      { ensemble: 1, num_clusters: 3, plans_needed: 309 },
      { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
      { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
      { ensemble: 4, num_clusters: 5.3, plans_needed: 251 },
      { ensemble: 5, num_clusters: 6.3, plans_needed: 268 },
    ];

    interface ensembleData {
      Num: number;
      ensemble1: number;
      ensemble2: number;
      ensemble3: number;
      ensemble4: number;
      ensemble5: number;
    }

    let data : ensembleData[] = [];
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
      <div>
        <TabContext value={currentTab}>
          <TabPanel value="1">
            {ensembleData.map((row) => (
              <Accordion defaultExpanded={row.expanded}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Button
                    variant="text"
                    size="large"
                    onClick={() => handleStepChange(1)}
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
        </TabContext>
      </div>
    );
  }

  return (
    <div className="distance-table-container">
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
      {currentTab == 1 && <DistanceGraph />}
    </div>
  );
}

export default DistanceTable;
