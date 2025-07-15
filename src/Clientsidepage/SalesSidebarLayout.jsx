import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import Sidenavbar from './Firstdashboard';
import SecondDashboard from './Seconddashboard';
// import './SalesSidebarLayout.css';

const SalesSidebarLayout = () => {
  return (
     <>
      <div className="layout-nav-bar">
        <Navbar />
      </div>
    <div className="dashboard-content">
        <SecondDashboard />
       <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SalesSidebarLayout;