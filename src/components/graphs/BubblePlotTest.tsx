import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface BubbleChartProps {
  seriesCount: number;
}

interface DataPoint {
  x: number;
  y: number;
  z: number;
}

const generateData = (baseval: number, count: number, yrange: { min: number; max: number }): DataPoint[] => {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = baseval;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push({ x, y, z });
    baseval += 86400000;
    i++;
  }
  return series;
};

const generateSeriesData = (seriesCount: number): Array<{ name: string; data: DataPoint[] }> => {
  const seriesData = [];
  for (let i = 1; i <= seriesCount; i++) {
    seriesData.push({
      name: `Bubble${i}`,
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, { min: 10, max: 60 }),
    });
  }
  return seriesData;
};

const BubbleChart: React.FC<BubbleChartProps> = ({ seriesCount }) => {
  const options = {
    series: generateSeriesData(seriesCount),
    chart: {
      height: 350,
      type: "bubble",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.8,
    },
    title: {
      text: "Simple Bubble Chart",
    },
    xaxis: {
      tickAmount: 12,
      type: "category",
    },
    yaxis: {
      max: 70,
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup on component unmount
    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div id="chart" />;
};

export default BubbleChart;
