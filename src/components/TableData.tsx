import React, { Component, FC, useState } from "react";
import "./css/TableData.css";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { flexbox } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { IntegerType } from "mongodb";
import cluster from "cluster";

function TableData() {
  const [currentTab, setCurrentTab] = useState("1");

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    console.log(newValue);
    setCurrentTab(String(newValue));
  }

  return (
    <>
      <TabContext value={currentTab}>
        <div className="table-container">
          <div className="tab-container">
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab
                  value="1"
                  label="Summary of Cluster"
                  sx={{ textTransform: "none" }}
                />
                <Tab
                  value="2"
                  label="Average Measures"
                  sx={{ textTransform: "none" }}
                />
                <Tab
                  value="3"
                  label="Association of clusters"
                  sx={{ textTransform: "none" }}
                />
              </Tabs>
            </Box>
          </div>
          <div>
            <TabPanel value="1">
              <ClusterTable />
            </TabPanel>
            <TabPanel value="2">
              <AverageMeasuresTable />
            </TabPanel>
            <TabPanel value="3">
              <AssociationClusters />
            </TabPanel>
          </div>
        </div>
      </TabContext>
    </>
  );
}

export default TableData;

interface ClusterNameCellProps {
  name: string;
}
/**
 *
 * Editable Table cell
 */

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

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditing(false);
    if(clusterName == "")
        setName(name);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <TableCell align="center" component="th" scope="row">
      {editing ? (
        <form className="form-control" onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          className="cluster-name-input cluster-name-input-alt"
          value={clusterName}
          onChange={handleChange}
          onBlur={handleBlur}
          
        />
        </form>
      ) : (
        <span onDoubleClick={handleDoubleClick}>{clusterName}</span>
      )}
    </TableCell>
  );
};

/**
 *
 * Table Data for cluster analysis
 */
function ClusterTable() {
  interface cluster_summary_table {
    cluster: number;
    name: string;
    num_districts: number;
    average_dist: number;
  }

  const sampleData: cluster_summary_table[] = [
    {
      cluster: 1,
      name: "cluster A",
      num_districts: 30,
      average_dist: 12.2,
    },
    {
      cluster: 2,
      name: "cluster B",
      num_districts: 12,
      average_dist: 9.5,
    },
    {
      cluster: 3,
      name: "cluster C",
      num_districts: 45,
      average_dist: 2.1,
    },
    {
      cluster: 4,
      name: "cluster D",
      num_districts: 17,
      average_dist: 13.2,
    },
  ];

  const [data, updateData] = useState(sampleData);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ height: "10px", fontSize: "10px" }}>
            <TableRow>
              <TableCell align="left">Cluster</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right"># District Plans</TableCell>
              <TableCell align="right">Average Distances</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.cluster}>
                <TableCell align="left">{row.cluster}</TableCell>
                <ClusterNameCell name={row.name} />
                <TableCell align="center">{row.num_districts}</TableCell>
                <TableCell align="center">{row.average_dist}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/**
 *
 * Table Data for cluster analysis
 */
function AverageMeasuresTable() {
  const sampleData1 = [
    { party: "Republican", men: "59%", women: "41%" },
    { party: "Democrat", men: "44%", women: "56%" },
  ];

  const sampleData2 = [
    {
      party: "Republican",
      white: "72%",
      black: "1%",
      asian: "1%",
      latino: "18%",
      other: "7%",
    },
    {
      party: "Democrat",
      white: "44%",
      black: "14%",
      asian: "3%",
      latino: "29%",
      other: "10%",
    },
  ];

  return (
    <>
      {/* 

                TABLE 1 

        */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Party affiliation</TableCell>
              <TableCell align="right">Men</TableCell>
              <TableCell align="right">Women</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData1.map((row) => (
              <TableRow key={row.party}>
                <TableCell component="th" scope="row">
                  {" "}
                  {row.party}{" "}
                </TableCell>
                <TableCell align="right">{row.men}</TableCell>
                <TableCell align="right">{row.women}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {/* 

                TABLE 2 

        */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Party affiliation</TableCell>
              <TableCell align="right">White</TableCell>
              <TableCell align="right">Black</TableCell>
              <TableCell align="right">Asian</TableCell>
              <TableCell align="right">Mixed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData2.map((row) => (
              <TableRow key={row.party}>
                <TableCell component="th" scope="row">
                  {" "}
                  {row.party}{" "}
                </TableCell>
                <TableCell align="right">{row.white}</TableCell>
                <TableCell align="right">{row.black}</TableCell>
                <TableCell align="right">{row.asian}</TableCell>
                <TableCell align="right">{row.other}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function AssociationClusters() {
  interface cluster_summary_table {
    ensemble: number;
    num_clusters: number;
    plans_needed: number;
  }
  const sampleData: cluster_summary_table[] = [
    { ensemble: 1, num_clusters: 3, plans_needed: 309 },
    { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
    { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
    { ensemble: 4, num_clusters: 5.3, plans_needed: 251 },
    { ensemble: 5, num_clusters: 6.3, plans_needed: 268 },
  ];
  const data = [];
  let a = Math.random() * 1.2;
  let b = Math.random() * 1.3;
  let c = Math.random() * 1.5;
  let d = Math.random() * 1.6;
  for (let i = 1; i < 500; i++) {
    data.push({
      Num: i,
      ensemble1: Math.log(i),
      ensemble2: Math.log(i) / Math.log(9) + a,
      ensemble3: Math.log(i) / Math.log(8) + b,
      ensemble4: Math.log(i) / Math.log(7) + c,
      ensemble5: Math.log(i) / Math.log(6) + d,
    });
  }
  const areas = {};
  let color;
  function randomColor() {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }

  return (
    <>
      <AreaChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Num" />
        <YAxis />
        <Tooltip />
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
        {}
      </AreaChart>
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
    </>
  );
}
