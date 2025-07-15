
// Graphs.jsx
import React, { useEffect, useState } from "react";
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
} from "recharts";
import api from "../Service/Api";

const Graphs = () => {
  const [salesData, setSalesData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Totals
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalAppointmentValue, setTotalAppointmentValue] = useState(0);
  const [totalBooked, setTotalBooked] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await api.get("/admin/analytics/revenue?period=daily");
        const chartData = res.data.data.revenueData.map(item => ({
          name: `${item._id.month}/${item._id.day}`,
          revenue: item.revenue,
          bookings: item.bookings,
          avgBookingValue: item.avgBookingValue
        }));
        setSalesData(chartData);

        // Calculate totals
        let revenueSum = 0;
        let appointmentsSum = 0;
        chartData.forEach(item => {
          revenueSum += item.revenue || 0;
          appointmentsSum += item.bookings || 0;
        });
        setTotalRevenue(revenueSum);
        setTotalAppointments(appointmentsSum);
        setTotalAppointmentValue(revenueSum); // or use a different field if needed
      } catch (err) {
        console.error("Error fetching sales data:", err);
      }
    };

    const fetchAppointmentData = async () => {
      try {
        const res = await api.get("/admin/analytics/bookings?period=daily");
        const chartData = res.data.data.bookingTrends.map(item => ({
          day: `${item._id.month}/${item._id.day}`,
          confirmed: item.completedBookings,
          cancelled: item.cancelledBookings,
          total: item.totalBookings
        }));
        setAppointmentData(chartData);

        // Calculate totals
        let bookedSum = 0;
        let confirmedSum = 0;
        let cancelledSum = 0;
        chartData.forEach(item => {
          bookedSum += item.total || 0;
          confirmedSum += item.confirmed || 0;
          cancelledSum += item.cancelled || 0;
        });
        setTotalBooked(bookedSum);
        setTotalConfirmed(confirmedSum);
        setTotalCancelled(cancelledSum);
      } catch (err) {
        console.error("Error fetching appointment data:", err);
      }
    };

    Promise.all([fetchSalesData(), fetchAppointmentData()]).then(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h3>Recent sales</h3>
          <span>Last 7 days</span>
          <h1>AED {totalRevenue.toLocaleString()}</h1>
          <p>
            Appointments <strong>{totalAppointments}</strong>
          </p>
          <p>
            Appointments value <strong>AED {totalAppointmentValue.toLocaleString()}</strong>
          </p>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" name="Revenue" />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Upcoming appointments</h3>
          <span>Next 7 days</span>
          <h1>{totalBooked} booked</h1>
          <p>
            Confirmed appointments <strong>{totalConfirmed}</strong>
          </p>
          <p>
            Cancelled appointments <strong>{totalCancelled}</strong>
          </p>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="confirmed" fill="#5B2EFF" name="Confirmed" />
              <Bar dataKey="cancelled" fill="#FF5B5B" name="Cancelled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
