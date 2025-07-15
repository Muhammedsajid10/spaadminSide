import React, { useState, useEffect } from "react";
import "./Topservices.css";
import api from "../Service/Api";

const TopStats = () => {
  const [topServices, setTopServices] = useState([]);
  const [topTeamMembers, setTopTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch top services from booking analytics
        const servicesResponse = await api.get('/admin/analytics/bookings');
        const popularServices = servicesResponse.data.data.popularServices || [];
        
        // Transform services data to match component structure
        const transformedServices = popularServices.slice(0, 5).map(service => ({
          service: service.serviceName || service.name || 'Unknown Service',
          thisMonth: service.bookings || 0,
          lastMonth: 0 // We'll need to calculate this from historical data
        }));

        // Fetch top team members from employee analytics
        const employeesResponse = await api.get('/admin/analytics/employees');
        const employeePerformance = employeesResponse.data.data.employeePerformance || [];
        
        // Transform employee data to match component structure
        const transformedEmployees = employeePerformance.slice(0, 5).map(employee => ({
          name: employee.employeeName || 'Unknown Employee',
          thisMonth: `AED ${employee.totalRevenue?.toFixed(2) || '0.00'}`,
          lastMonth: 'AED 0.00' // We'll need to calculate this from historical data
        }));

        setTopServices(transformedServices);
        setTopTeamMembers(transformedEmployees);
        setError(null);
      } catch (err) {
        console.error('Error fetching top stats:', err);
        setError('Failed to load data. Please try again.');
        
        // Fallback to default data if API fails
        setTopServices([
          { service: "Relaxing Massage", thisMonth: 282, lastMonth: 514 },
          { service: "Deep tissue Massage", thisMonth: 13, lastMonth: 7 },
          { service: "Mini Facial", thisMonth: 5, lastMonth: 3 },
          { service: "Candle Massage", thisMonth: 5, lastMonth: 13 },
          { service: "Balinese Massage", thisMonth: 5, lastMonth: 5 },
        ]);
        setTopTeamMembers([
          { name: "sarita Lamsal", thisMonth: "AED 13,809.00", lastMonth: "AED 18,173.00" },
          { name: "Dayu Eka", thisMonth: "AED 12,250.00", lastMonth: "AED 2,825.00" },
          { name: "Icha Faradisa", thisMonth: "AED 11,440.00", lastMonth: "AED 18,700.00" },
          { name: "Employee", thisMonth: "AED 10,930.00", lastMonth: "AED 23,355.00" },
          { name: "Nining Niken", thisMonth: "AED 10,560.00", lastMonth: "AED 19,374.00" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="top-stats-container">
        <div className="stats-card">
          <h2 className="stats-title">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="top-stats-container">
      {error && (
        <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
          {error}
        </div>
      )}
      
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

export default TopStats;