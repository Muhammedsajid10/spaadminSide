import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidenavbar from "./Firstdashboard";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="main-content-container">
      <div className="layout-nav-bar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <div className="sidebar-container">
          <Sidenavbar />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;