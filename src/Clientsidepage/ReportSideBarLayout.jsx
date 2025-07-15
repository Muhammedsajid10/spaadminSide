import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidenavbar from './Firstdashboard';
import CatalogSidebar from './CatalogSidebar';
import ReportSideBar from './ReportSideBar';
const ReportSideBarLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="layout-nav-bar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <Sidenavbar />
        <ReportSideBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ReportSideBarLayout;