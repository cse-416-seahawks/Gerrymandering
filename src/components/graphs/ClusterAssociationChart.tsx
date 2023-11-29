import React, { useState, useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import * as sampleData from "../SampleData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function ClusterAssociationGraph() {
  let color;
  function randomColor() {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }
  return (
    <div>
      <Typography>
        <b>Association of clusters with ensemble size</b>
      </Typography>
      <div className="graph-container">
        <LineChart width={800} height={670} margin={{ top : 10, right : 10, bottom : 30, left : 10}} data={sampleData.ensembleData_2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Num">
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "1rem",
                fill: "black",
              }}
              value={"Number of District Plans"}
              position={"insideBottom"}
              offset={-50}
              
            />
          </XAxis>
          <YAxis>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "1rem",
                fill: "black",

              }}
              position={"insideLeft"}
              angle={270}
              value={"Number of clusters"}
            />
          </YAxis>
          <Tooltip contentStyle={{ fontSize: 18 }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="ensemble1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="ensemble2"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Line
            type="monotone"
            dataKey="ensemble3"
            stroke={randomColor()}
            fill={color}
          />
          <Line
            type="monotone"
            dataKey="ensemble4"
            stroke={randomColor()}
            fill={color}
          />
          <Line
            type="monotone"
            dataKey="ensemble5"
            stroke={randomColor()}
            fill={color}
          />
          {/*
                                Dev note, remember, all of this is not dynamic yet, so it's yet to be implemented with
                                data, so this is will still need fixes before this is ready.
                                */}
        </LineChart>
      </div>
    </div>
  );
}
