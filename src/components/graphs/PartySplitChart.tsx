import { data } from 'jquery';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { DistrictPlanData } from '../interfaces/AnalysisInterface';

interface PartySplitChartProps {
  districtPlans : DistrictPlanData[]
}

export default function PartySplitChart( { districtPlans } : PartySplitChartProps) {

  const parseSplits = (districtPlans : DistrictPlanData[]) => {
    return districtPlans.map((district) => {
        const splits = district.splits.split("-",2);
        console.log(splits)
        return {
          name : `${district.district_plan}`,
          Republican : Number(splits[0]),
          Democrat : Number(splits[1])
        }
    })
  }
  return (
      <BarChart width={800} height={680} data={parseSplits(districtPlans)} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis>
        <Label
          style={{
            textAnchor: "middle",
            fontSize: "1rem",
            fill: "black",
          }}
          position={"insideLeft"}
          angle={270}
          value={"Number of Districts"}/>
      </YAxis>
      <Tooltip />
      <Legend />
      <Bar dataKey="Democrat" stackId="a" fill="#4287f5"  />
      <Bar dataKey="Republican" stackId="a" fill="#f54242"  />
    </BarChart>
  );
}
