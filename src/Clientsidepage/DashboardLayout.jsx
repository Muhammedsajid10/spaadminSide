import React from "react";
import { Outlet } from "react-router-dom";
import Sidenavbar from "../Clientsidepage/Firstdashboard";
// import "../Clientsidepage/DashboardLayout.css";
import Navbar from "./Navbar";
import "../Clientsidepage/HomePage.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="layout-nav-bar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <Sidenavbar />
        <div className="home-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;