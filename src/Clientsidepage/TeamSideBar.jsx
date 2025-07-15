import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TeamSidebar.css'; // You'll need to create this CSS file

const TeamSidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleBackClick = () => {
    setIsVisible(!isVisible);
    // Update main content margin when sidebar is toggled
    const mainContent = document.querySelector('.team-content');
    if (mainContent) {
      mainContent.style.marginLeft = isVisible ? '80px' : '380px';
    }
  };

  return (
    <>
      <div className={`team-container ${!isVisible ? 'hidden' : ''}`}>
        <div className="team-header">
          <h1 className='team-heading'>Team</h1>
        </div>
        <div className="menu-list">
          <Link to="/team/" className="menu-item">Team Members</Link>
          <Link to="/team/scheduled-shifts" className="menu-item">Scheduled Shifts</Link>
          <Link to="/team/time-sheets" className="menu-item">Time Sheets</Link>
        </div>
      </div>
    </>
  );
};

export default TeamSidebar;