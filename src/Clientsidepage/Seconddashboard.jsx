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

  // Rest of your component remains the same
  return (
    <>
     
      <div className={`sales-container ${!isVisible ? 'hidden' : ''}`}>
 <div className="menu-list">
  <h1>Sales <strong /></h1>
          {/* <Link to="/sales-sidebar" className="menu-item">Overview</Link> */}
          <Link to="/sales-sidebar/" className="menu-item">Daily sales summary</Link>
          <Link to="/sales-sidebar/appointments" className="menu-item">Appoinments</Link>
          <Link to="/sales-sidebar/sales-page" className="menu-item">Sales</Link>
          

          <Link to="/sales-sidebar/payments" className="menu-item">Payments</Link>
          <Link to="/sales-sidebar/gift-cards" className="menu-item">Gift cards sold</Link>
          <Link to="/sales-sidebar/membership" className="menu-item">Memberships sold</Link>
        </div>      </div>
    </>
  );
};

export default SecondDashboard;