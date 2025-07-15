import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Seconddashboard.css';

const TeamSideBar = () => {
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
      <button 
        className={`back-button ${!isVisible ? 'hidden' : ''}`} 
        onClick={handleBackClick}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={`sales-container ${!isVisible ? 'hidden' : ''}`}>
 <div className="menu-list">
  <h1>Team <strong /></h1>
          {/* <Link to="/sales-sidebar" className="menu-item">Overview</Link> */}
          <Link to="/team-sidebar/" className="menu-item">Team Members</Link>
          <Link to="/team-sidebar/sheduled-shifts" className="menu-item">Sheduled Shifts</Link>
          <Link to="/team-sidebar/time-sheets" className="menu-item">Time Sheets</Link>

        </div>      </div>
    </>
  );
};

export default TeamSideBar;