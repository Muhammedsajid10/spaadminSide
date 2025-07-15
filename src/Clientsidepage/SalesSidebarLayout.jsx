import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidenavbar from './Firstdashboard';
import SecondDashboard from './Seconddashboard';
import "../Clientsidepage/SalesSidebarLayout.css"

const SalesSidebarLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="layout-nav-bar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <Sidenavbar />
        <SecondDashboard />
        <div className="sales-side-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SalesSidebarLayout;