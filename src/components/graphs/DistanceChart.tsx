import React from "react";
import Boxplot from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default () => {
  const series = [
    {
      type: "boxPlot",
      data: [
        {
          x: "Hamming Distance",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Optimal Transport",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Total Variation",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Additional Measure",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Additional Measure",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Additional Measure",
          y: [29, 31, 35, 39, 44],
        },
      ],
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "boxPlot",
      height: 800,
      toolbar: {
        show: false,
      },
    },
    yaxis :{
      min : 25
    },
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
  return <Boxplot options={options} series={series} height={710} />;
};
