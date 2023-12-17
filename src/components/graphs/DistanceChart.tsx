import React, { useContext } from "react";
import Boxplot from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { GlobalContext } from "../../globalContext";

export default function DistanceChart() {
  const {state, dispatch} = useContext(GlobalContext);
  
  function distanceGraphData() {
    const tableData = state[state.length - 1].compareDistanceMeasuresData;
    return  [
          {
            type: "boxPlot",
            data: tableData.map((measure) => ({
              x: measure.distanceMeasure,
              y: [measure.min, measure.first_quartile, measure.median, measure.third_quartile, measure.max],
            })),
          },
        ];
  }
  
  const options: ApexOptions = {
    chart: {
      type: "boxPlot",
      height: 800,
      width : 600,
      toolbar: {
        show: false,
      },
    },
    yaxis: { min: 0, max : 1 },
    title: {
      text: "Distance Measure Variation",
      align: "center",
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#e9ecef",
          lower: "#f8f9fa",
        },
      },
    },
    stroke: {
      colors: ['#6c757d'],
      width : 1
    }
  };

  return <Boxplot options={options} series={distanceGraphData()} height={710} />;
};
