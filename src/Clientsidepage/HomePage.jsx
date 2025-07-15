// Main Dashboard Component
import React from "react";
import Graphs from "./Graphs";
import Todayandbody from "./Todayandbody";
import TopService from "./Topservices";
import UpcomingAppoinments from "./UpcomingAppoinments";
import Appoint from "./Appoint";
import AppointmentsRedesign from "./Todayandbody";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="dashboard-row">
        <div className="dashboard-col">
          <Graphs />
        </div>
        <div className="dashboard-col">
          <UpcomingAppoinments />
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-col">
          <AppointmentsRedesign />
        </div>
        <div className="dashboard-col">
          <TopService />
        </div>
      </div>
    </div>
  );
};

export default HomePage;