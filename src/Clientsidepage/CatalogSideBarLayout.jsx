import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidenavbar from './Firstdashboard';
import CatalogSidebar from './CatalogSidebar';
import "../Clientsidepage/CatalogSidebarLayout.css";
const CatalogSidebarLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="layout-nav-bar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <CatalogSidebar />
        <div className="catalog-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CatalogSidebarLayout;