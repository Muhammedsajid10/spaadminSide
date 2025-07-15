import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidenavbar from './Firstdashboard';
import SecondDashboard from './Seconddashboard';
import TeamSideBar from './TeamSideBar';
// import "../Clientsidepage/TeamSideBar.css";
import "../Clientsidepage/CatalogSidebarLayout.css";


const TeamSideBarLayout = () => {
  return (
    <>
     <div className="dashboard-container">
      <div className="layout-nav-bar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <TeamSideBar />
        <div className="catalog-content">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default TeamSideBarLayout;