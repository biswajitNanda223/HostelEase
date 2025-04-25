// components/PollResult.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PollResult = ({ poll }) => {
  const data = poll.options.map(opt => ({
    name: opt.text,
    votes: opt.count
  }));

  return (
    <div className="container mt-4">
      <h4>Poll Results</h4>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default PollResult;
