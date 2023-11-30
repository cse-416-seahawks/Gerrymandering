import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

export default function PartySplitChart() {
  const data = [
      {
        name: 'District 1',
        Republican: 6,
        Democrat: 4,
        amt: 2400,
      },
      {
        Republican: 8,
        Democrat: 2,
        amt: 2210,
      },
      {
        name: 'District 3',
        Republican: 3,
        Democrat: 7,
        amt: 2290,
      },
      {
        name: 'District 4',
        Republican: 5,
        Democrat: 5,
        amt: 2000,
      },
      {
        name: 'District 5',
        Republican: 4,
        Democrat: 6,
        amt: 2181,
      },
      {
        name: 'District 6',
        Republican: 1,
        Democrat: 9,
        amt: 2500,
      },
    ];

    return (
      <BarChart
        width={800}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
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
        <Bar dataKey="Democrat" fill="#4287f5"  />
        <Bar dataKey="Republican" fill="#f54242"  />
      </BarChart>
    );
  
}
