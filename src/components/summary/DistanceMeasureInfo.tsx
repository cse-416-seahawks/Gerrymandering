import React from "react";
import DistanceChart from "../graphs/DistanceChart";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function DistanceMeasureInfo() {
  return (
      <div>
        <DistanceChart />
      </div>
  );
}


