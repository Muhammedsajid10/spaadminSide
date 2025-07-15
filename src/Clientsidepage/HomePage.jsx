// DashboardPage.jsx
import React from "react";
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
} from "recharts";
import "./HomePage.css";


// Data for Graphs component
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

// Graphs Component
const Graphs = () => {
  return (
    <div className="graph-upcoming-container">
      <div className="card">
        <div className="card-header">
          <h3>Recent sales</h3>
          <span>Last 7 days</span>
          <h1>AED 32,505.00</h1>
          <p>
            Appointments <strong>105</strong>
          </p>
          <p>
            Appointments value <strong>AED 25,625.00</strong>
          </p>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="appointments" stroke="#00C49F" />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

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
    </div>
  );
};

// Data for AppointmentsRedesign component
const appointments = [
    {
        date: '20 Jun',
        time: 'Fri, 20 Jun 2025 16 : 15',
        status: 'Booked',
        title: 'Lava Stone Massage',
        type: 'Walk-In, 1 h with Dayu',
        payment: 'cash',
        price: 'AED 300',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 17 : 30',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Walk-In, 1 h with Sarita',
        payment: '',
        price: 'AED 250',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 21 : 40',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Samar, 1 h with Putri',
        payment: '',
        price: 'AED 200',
    },
    {
        date: '20 Jun',
        time: 'Fri, 20 Jun 2025 16 : 15',
        status: 'Booked',
        title: 'Lava Stone Massage',
        type: 'Walk-In, 1 h with Dayu',
        payment: 'cash',
        price: 'AED 300',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 17 : 30',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Walk-In, 1 h with Sarita',
        payment: '',
        price: 'AED 250',
    },
    {
        date: '20 Jun',
        time: 'Fri, 20 Jun 2025 16 : 15',
        status: 'Booked',
        title: 'Lava Stone Massage',
        type: 'Walk-In, 1 h with Dayu',
        payment: 'cash',
        price: 'AED 300',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 17 : 30',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Walk-In, 1 h with Sarita',
        payment: '',
        price: 'AED 250',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 21 : 40',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Samar, 1 h with Putri',
        payment: '',
        price: 'AED 200',
    },
    {
        date: '20 Jun',
        time: 'Fri, 20 Jun 2025 16 : 15',
        status: 'Booked',
        title: 'Lava Stone Massage',
        type: 'Walk-In, 1 h with Dayu',
        payment: 'cash',
        price: 'AED 300',
    },
    {
        date: '20 Jun',
        time: 'Fri, 20 Jun 2025 16 : 15',
        status: 'Booked',
        title: 'Lava Stone Massage',
        type: 'Walk-In, 1 h with Dayu',
        payment: 'cash',
        price: 'AED 300',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 17 : 30',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Walk-In, 1 h with Sarita',
        payment: '',
        price: 'AED 250',
    },
    {
        date: '15 Jun',
        time: 'Sun, 15 Jun 2025 21 : 40',
        status: 'Completed',
        title: 'Relaxing Massage',
        type: 'Samar, 1 h with Putri',
        payment: '',
        price: 'AED 200',
    },
    {
        date: '20 Jun',
        time: 'Fri, 20 Jun 2025 16 : 15',
        status: 'Booked',
        title: 'Lava Stone Massage',
        type: 'Walk-In, 1 h with Dayu',
        payment: 'cash',
        price: 'AED 300',
    },
];

// AppointmentsRedesign Component
const AppointmentsRedesign = () => {
    return (
        <div className='appointments-layout'>
            <div className="appointments-left-section">
                <div className="activity-container">
                    <h2>Appointments Activity</h2>

                    <div className="activity-scroll-wrapper">
                        <div className="activity-list">
                            {appointments.map((app, index) => (
                                <div key={index} className="activity-card">
                                    <div className="activity-date">{app.date}</div>

                                    <div className="activity-details">
                                        <div className="activity-time-status">
                                            <span className="activity-time">{app.time}</span>
                                            <span className={`activity-status ${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </div>

                                        <div className="activity-title">{app.title}</div>
                                        <div className="activity-type">{app.type}</div>
                                        {app.payment && <div className="activity-payment">{app.payment}</div>}
                                    </div>

                                    <div className="activity-price">{app.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="appointments-right-section">
                <div>
                        <h3 className="next-appointment-heading">Today's Next Appointments</h3>
                    </div>
                <div className="next-appointment-container">
                    
                    <div className='next-appointment-box'>
                        <div className="next-date-box">
                            <div className="next-date">21</div>
                            <div className="next-month">Jun</div>
                        </div>
                        <div className="next-details">
                            <div className="next-time-status">
                                <span className="next-time">Sat 15:30</span>
                                <span className="next-status">Booked</span>
                            </div>
                            <div className="next-title">Relaxing Massage</div>
                            <div className="next-info">Adna, 1h with Dayu</div>
                            <div className="next-location">In fairmont wet cupping</div>
                        </div>
                        <div className="next-price">AED 250</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Data for TopStats component
const topServices = [
  { service: "Relaxing Massage", thisMonth: 282, lastMonth: 514 },
  { service: "Deep tissue Massage", thisMonth: 13, lastMonth: 7 },
  { service: "Mini Facial", thisMonth: 5, lastMonth: 3 },
  { service: "Candle Massage", thisMonth: 5, lastMonth: 13 },
  { service: "Balinese Massage", thisMonth: 5, lastMonth: 5 },
];

const topTeamMembers = [
  { name: "sarita Lamsal", thisMonth: "AED 13,809.00", lastMonth: "AED 18,173.00" },
  { name: "Dayu Eka", thisMonth: "AED 12,250.00", lastMonth: "AED 2,825.00" },
  { name: "Icha Faradisa", thisMonth: "AED 11,440.00", lastMonth: "AED 18,700.00" },
  { name: "Employee", thisMonth: "AED 10,930.00", lastMonth: "AED 23,355.00" },
  { name: "Nining Niken", thisMonth: "AED 10,560.00", lastMonth: "AED 19,374.00" },
];

// TopStats Component
const TopStats = () => {
  return (
    <div className="top-stats-container">
      <div className="stats-card">
        <h2 className="stats-title">Top services</h2>
        <div className="stats-table">
          <div className="stats-header stats-row">
            <div className="stats-cell">Service</div>
            <div className="stats-cell">This month</div>
            <div className="stats-cell">Last month</div>
          </div>
          {topServices.map((item, index) => (
            <div className="stats-row" key={index}>
              <div className="stats-cell">{item.service}</div>
              <div className="stats-cell">{item.thisMonth}</div>
              <div className="stats-cell">{item.lastMonth}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-card">
        <h2 className="stats-title">Top team member</h2>
        <div className="stats-table">
          <div className="stats-header stats-row">
            <div className="stats-cell">Team member</div>
            <div className="stats-cell">This month</div>
            <div className="stats-cell">Last month</div>
          </div>
          {topTeamMembers.map((member, index) => (
            <div className="stats-row" key={index}>
              <div className="stats-cell">{member.name}</div>
              <div className="stats-cell">{member.thisMonth}</div>
              <div className="stats-cell">{member.lastMonth}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const DashboardPage = () => {
  return (
    <div>
      <Graphs />
      <AppointmentsRedesign />
      <TopStats />
    </div>
  );
};

export default DashboardPage;