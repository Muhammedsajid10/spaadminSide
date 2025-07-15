// Graphs.jsx
import React from "react";
import "./Graphs.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const salesData = [
  { name: "Sat 14", appointments: 6200, value: 9000 },
  { name: "Sun 15", appointments: 6200, value: 9400 },
  { name: "Mon 16", appointments: 0, value: 0 },
  { name: "Tue 17", appointments: 5700, value: 3600 },
  { name: "Wed 18", appointments: 4600, value: 2800 },
  { name: "Thu 19", appointments: 2500, value: 3700 },
  { name: "Fri 20", appointments: 2700, value: 2100 },
  { name: "Sat 21", appointments: 100, value: 100 },
];

const appointmentData = [
  { day: "Sun 22", confirmed: 5 },
  { day: "Mon 23", confirmed: 0 },
  { day: "Tue 24", confirmed: 0 },
  { day: "Wed 25", confirmed: 0 },
  { day: "Thu 26", confirmed: 0 },
  { day: "Fri 27", confirmed: 0 },
  { day: "Sat 28", confirmed: 0 },
];

const Graphs = () => {
  return (
    <div className="graphs-container">
      <div className="card sales-card">
        <div className="card-header">
          <div className="header-content">
            <h3>Recent sales</h3>
            <span className="date-range">Last 7 days</span>
          </div>
          <div className="sales-info">
            <h1>AED 32,505.00</h1>
            <div className="stats-container">
              <div className="stat-item">
                <p>Appointments</p>
                <strong>105</strong>
              </div>
              <div className="stat-item">
                <p>Appointments value</p>
                <strong>AED 25,625.00</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#ddd' }}
              />
              <YAxis 
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#ddd' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="appointments" 
                stroke="#00C49F" 
                strokeWidth={2}
                dot={{ fill: '#00C49F', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
