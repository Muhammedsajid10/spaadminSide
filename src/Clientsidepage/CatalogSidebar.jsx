import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Clientsidepage/CatalogSideBarLayout.css";

const CatalogSidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleBackClick = () => {
    setIsVisible(!isVisible);
    // Update main content margin when sidebar is toggled
    const mainContent = document.querySelector('.catalog-content');
    if (mainContent) {
      mainContent.style.marginLeft = isVisible ? '80px' : '380px';
    }
  };

  return (
    <>
      <div className={`catalog-container ${!isVisible ? 'hidden' : ''}`}>
        <div className="catalog-header">
          <h1>Catalog</h1>
          <button 
            className={`toggle-button ${!isVisible ? 'hidden' : ''}`} 
            onClick={handleBackClick}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="menu-list">
          <Link to="/catalog-sidebar/" className="menu-item">Service Menu</Link>
          <Link to="/catalog-sidebar/memberships" className="menu-item">Memberships</Link>
        </div>
      </div>
    </>
  );
};

export default CatalogSidebar;