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
    <div>
 <div className="first-row">
          <div className="recent-sales">
            <Graphs />
          </div>
          <div className="upcoming-appointments">
            <UpcomingAppoinments />
        </div>
      
      </div>
       <div className="first-row">
        <AppointmentsRedesign />
      
      </div>
       <div className="first-row">
        <TopService />
      
      </div>
      
      </div>

    
   
  );
};

export default HomePage;