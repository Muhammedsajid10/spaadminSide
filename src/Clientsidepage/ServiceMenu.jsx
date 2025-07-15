import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, MoreVertical, ChevronDown } from 'lucide-react';
import './ServiceMenu.css';

const ServiceMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const categories = [
    { name: 'All categories', count: 20 },
    { name: 'Body Massage', count: 11 },
    { name: 'Body Treatmets', count: 5 },
    { name: 'Oriental Baths', count: 2 },
    { name: 'Facials', count: 2 }
  ];

  const services = [
    {
      id: 1,
      category: 'Body Massage',
      name: 'Relaxing Massage',
      description: 'Indulge in a blissful escape with a relaxing massage. Feel tension melt away as skilled...',
      variants: [
        { name: 'Relaxing Massage', duration: '1h', price: 'AED 410' },
        { name: 'Couple', duration: '1h', price: 'AED 820' }
      ]
    },
    {
      id: 2,
      category: 'Body Massage',
      name: 'Swedish Massage',
      description: '',
      variants: [
        { name: 'Swedish Massage', duration: '1h', price: 'AED 410' }
      ]
    }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="service-menu">
      <div className="service-menu-header">
        <div className="header-content">
          <h1>Service menu</h1>
          <p>View and manage the services offered by your business. <a href="#" className="learn-more">Learn more</a></p>
        </div>
        <div className="header-actions">
          <button className="options-btn">
            Options <ChevronDown size={16} />
          </button>
          <button className="add-btn">
            Add <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="service-menu-controls">
        <div className="search-section">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search service name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="filters-btn">
            <Filter size={16} />
            Filters
            <div className="filter-toggle">
              <div className="toggle-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </button>
        </div>
        <button className="manage-order-btn">
          <ArrowUpDown size={16} />
          Manage order
        </button>
      </div>

      <div className="service-menu-content">
        <div className="sidebar">
          <div className="categories-section">
            <h3>Categories</h3>
            <div className="categories-list">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>{service.name}</h3>
                <button className="actions-btn">
                  Actions <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="service-content">
                <div className="service-left">
                  <div className="orange-accent-bar"></div>
                  <div className="service-info">
                    <h4>{service.name}</h4>
                    {service.description && (
                      <p className="service-description">{service.description}</p>
                    )}
                    
                    <div className="service-variants">
                      {service.variants.map((variant, index) => (
                        <div key={index} className="variant-row">
                          <div className="variant-info">
                            <span className="variant-name">{variant.name}</span>
                            <span className="variant-duration">{variant.duration}</span>
                          </div>
                          <span className="variant-price">{variant.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="service-actions-menu">
                  <button className="service-menu-btn">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;