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
import { fetchAssociationData } from "../apiClient";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useParams } from "react-router-dom";

interface AssociationData {
  numDistrictPlans: number;
  ensemble1: number;
  ensemble2: number;
  ensemble3: number;  
  ensemble4: number;
  ensemble5: number;
}

export default function ClusterAssociationGraph() {
  const { state, dispatch } = useContext(GlobalContext);
  const [ axisLabels, setAxisLabels ] = useState<Array<number>>([]);
  const [ graphData, setGraphData ] = useState<Array<AssociationData>>([]);
  const { stateName } = useParams<{stateName : AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;

  useEffect(() => {
    async function getAssociationData() {
      try {
        const response = await fetchAssociationData(currentState);
        if (response) {
          setAxisLabels([response.x_axis_label, response.y_axis_label]);
          setGraphData(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
    getAssociationData();
  }, []);

  return (
    <div>
      <Typography>
        <b>Association of clusters with ensemble size</b>
      </Typography>
      <div className="graph-container">
        <LineChart width={800} height={670} margin={{ top: 10, right: 10, bottom: 30, left: 10}} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="numDistrictPlans">
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "1rem",
                fill: "black",
              }}
              value={axisLabels[0]}
              position={"insideBottom"}
              offset={-50}
            />
          </XAxis>
          <YAxis domain={[0, 80]}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "1rem",
                fill: "black",
              }}
              position={"insideLeft"}
              angle={270}
              value={axisLabels[1]}
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
            stroke="#BEBD7F"
            fill="#BEBD7F"
          />
          <Line
            type="monotone"
            dataKey="ensemble4"
            stroke="#ba32b5"
            fill="#ba32b5"
          />
          <Line
            type="monotone"
            dataKey="ensemble5"
            stroke="#354D73"
            fill="#354D73"
          />
        </LineChart>
      </div>
    </div>
  );
}