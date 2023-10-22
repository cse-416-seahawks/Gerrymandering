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
import * as sampleData from "../SampleData"
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
import { DistrictSelectionProps } from "./TableTypes";

export default ({ onDistrictSelection }: DistrictSelectionProps) => {
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
  
  
  
    return (
      <>
        <div className="graph-container-row">
          <div className="graph-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "350px",
              }}
            >
              <div
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  fontSize: "1.0rem",
                  height: "100px",
                  width: "60px",
                }}
              >
                Avgerage Household Size
              </div>
            </div>
            <ScatterChart
              width={800}
              height={350}
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
                name="African American Population (%)"
              />
              <YAxis dataKey="y" type="number" name="Average Household Size" />
              {/* <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" /> */}
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{ fontSize: 18 }}
              />
              <Legend />
              <Scatter name="Available Data" data={sampleData.data01} fill="#8884d8" />
              <Scatter name="Unavailable Data" data={sampleData.data02} fill="#82ca9d" />
            </ScatterChart>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "1.0rem",
              width: "65%",
              margin: "2rem",
              fontWeight: "700",
              justifyContent: "end",
            }}
          >
            African American Population (%)
          </div>
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
                  {sampleData.districts.map((row) => (
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
                  {sampleData.Data2.map((row) => (
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
      </>
    );
  }
  