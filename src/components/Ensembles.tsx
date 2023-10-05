import React, { FC, useState, useContext, useEffect } from "react";
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
import Button from "@mui/material/Button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { NevadaDistrictContext } from "../NevadaContext";


function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ensembleData = [
    {
        ensemble: 1,
        data: [
            { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
            { label: "Average distance between clusters", detail: getRandomNumber(12.1, 62.1) },
            { label: "Number of district plans", detail: getRandomNumber(500, 1000) },
        ],
        expanded: true
    },
    {
        ensemble: 2,
        data: [
            { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
            { label: "Average distance between clusters", detail: getRandomNumber(12.1, 62.1) },
            { label: "Number of district plans", detail: getRandomNumber(500, 1000) },
        ],
    },
    {
        ensemble: 3,
        data: [
            { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
            { label: "Average distance between clusters", detail: getRandomNumber(12.1, 62.1) },
            { label: "Number of district plans", detail: getRandomNumber(500, 1000) },
        ],
    },
    {
        ensemble: 4,
        data: [
            { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
            { label: "Average distance between clusters", detail: getRandomNumber(12.1, 62.1) },
            { label: "Number of district plans", detail: getRandomNumber(500, 1000) },
        ],
    },
    {
        ensemble: 5,
        data: [
            { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
            { label: "Average distance between clusters", detail: getRandomNumber(12.1, 62.1) },
            { label: "Number of district plans", detail: getRandomNumber(500, 1000) },
        ],
    },
];

function Ensembles() {
        
    const { state, dispatch } = useContext(NevadaDistrictContext);
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newMethod: string
    ) => {
        console.log("hise", newMethod)
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
        <div>
            <TabContext value={currentTab}>
                <TabPanel value="1">
                    {ensembleData.map((row) => (
                        <Accordion defaultExpanded={row.expanded}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Button
                                        variant="text"
                                        size="large"
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
                    <br/>
                </TabPanel>
                
            </TabContext>   
        </div>
    );
}


export default Ensembles