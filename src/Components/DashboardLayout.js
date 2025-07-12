import React from "react";
import { Outlet } from "react-router-dom";
import Sidenavbar from "./Sidenavbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar-container">
        <Sidenavbar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;