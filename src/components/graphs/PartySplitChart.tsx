import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

export default function PartySplitChart() {

    const data = [
        {
          name: 'Plan 1',
          republican: 6,
          democrat: 4,
          amt: 2400,
        },
        {
          name: 'Plan 2',
          republican: 8,
          democrat: 2,
          amt: 2210,
        },
        {
          name: 'Plan 3',
          republican: 3,
          democrat: 7,
          amt: 2290,
        },
        {
          name: 'Plan 4',
          republican: 5,
          democrat: 5,
          amt: 2000,
        },
        {
          name: 'Plan 5',
          republican: 4,
          democrat: 6,
          amt: 2181,
        },
        {
          name: 'Plan 6',
          republican: 1,
          democrat: 9,
          amt: 2500,
        },
      ];

    return (
        <BarChart
          width={800}
          height={680}
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
          <Bar dataKey="democrat" fill="#4287f5"  />
          <Bar dataKey="republican" fill="#f54242"  />
        </BarChart>
    );
  
}
