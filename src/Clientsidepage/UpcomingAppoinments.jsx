
import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import "./UpcomingAppoinments.css";

const appointmentData = [
  { day: "Mon", confirmed: 1 },
  { day: "Tue", confirmed: 0 },
  { day: "Wed", confirmed: 2 },
  { day: "Thu", confirmed: 1 },
  { day: "Fri", confirmed: 1 },
  { day: "Sat", confirmed: 0 },
  { day: "Sun", confirmed: 0 },
];

const UpcomingAppoinments = () => (
  <div className="card">
    <div className="card-header">
      <h3>Upcoming appointments</h3>
      <span>Next 7 days</span>
      <h1>5 booked</h1>
      <p>
        Confirmed appointments <strong>5</strong>
      </p>
      <p>
        Cancelled appointments <strong>0</strong>
      </p>
    </div>
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={appointmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="confirmed" fill="#5B2EFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default UpcomingAppoinments;
