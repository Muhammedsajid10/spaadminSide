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
          <h1 className='catalog-heading'>Catalog</h1>
        </div>
        <div className="menu-list">
          <Link to="/catalog/" className="menu-item">Service Menu</Link>
          <Link to="/catalog/memberships" className="menu-item">Memberships</Link>
        </div>
      </div>
    </>
  );
};

export default CatalogSidebar;