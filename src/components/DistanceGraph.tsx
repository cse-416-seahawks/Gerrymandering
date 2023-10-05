import React from "react";
import { data } from "./boxplot/data";
import { Boxplot } from "./boxplot/Boxplot";


const DistanceGraph = ({ width = 700, height = 400 }) => (
    <Boxplot data={data} width={width} height={height} />
  );
  

export default DistanceGraph;