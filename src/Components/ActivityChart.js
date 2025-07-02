import React from 'react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={data} margin={{ left: 40 }}>
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="hours" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Example data


export default ActivityChart;