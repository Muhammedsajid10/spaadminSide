import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Seconddashboard.css';

const SecondDashboard = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleBackClick = () => {
    setIsVisible(!isVisible);
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      // Toggle the sidebar-hidden class for margin adjustment
      mainContent.style.marginLeft = isVisible ? '80px' : '480px';
    }
  };

  return (
    <>
      <div className={`sales-container ${!isVisible ? 'hidden' : ''}`}>
        <div className="menu-list">
          <h1>Sales <strong /></h1>
          <Link to="/sales/" className="menu-item">Daily Sales Summary</Link>
          <Link to="/sales/appointments" className="menu-item">Appointments</Link>
          {/* <Link to="/sales/sales-page" className="menu-item">Sales</Link> */}
          <Link to="/sales/payments" className="menu-item">Payments</Link>
          <Link to="/sales/gift-cards" className="menu-item">Gift Cards Sold</Link>
          <Link to="/sales/memberships" className="menu-item">Memberships Sold</Link>
        </div>
      </div>
    </>
  );
};

export default SecondDashboard;