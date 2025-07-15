import React, { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button, TextField } from "@mui/material";
import "./ServiceMenu.css";

const ServiceMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  // Sample data for services
  const services = [
    {
      id: 1,
      category: "Body Massage",
      name: "Relaxing Massage",
      description:
        "Indulge in a blissful escape with a relaxing massage. Feel tension melt away as skilled...",
      duration: "1h",
      price: "AED 410",
      options: [
        { name: "Relaxing Massage", duration: "1h", price: "AED 410" },
        { name: "Couple", duration: "1h", price: "AED 820" },
      ],
    },
    {
      id: 2,
      category: "Body Massage",
      name: "Swedish Massage",
      description:
        "Experience the therapeutic benefits of Swedish massage techniques...",
      duration: "1h",
      price: "AED 410",
      options: [{ name: "Swedish Massage", duration: "1h", price: "AED 410" }],
    },
    {
      id: 3,
      category: "Body Treatments",
      name: "Deep Tissue Massage",
      description:
        "Intensive massage targeting deep muscle layers for ultimate relief...",
      duration: "1h",
      price: "AED 450",
      options: [
        { name: "Deep Tissue Massage", duration: "1h", price: "AED 450" },
      ],
    },
    {
      id: 4,
      category: "Oriental Baths",
      name: "Turkish Bath",
      description:
        "Traditional Turkish bath experience with steam and exfoliation...",
      duration: "45min",
      price: "AED 350",
      options: [{ name: "Turkish Bath", duration: "45min", price: "AED 350" }],
    },
    {
      id: 5,
      category: "Facials",
      name: "Hydrating Facial",
      description:
        "Rejuvenating facial treatment for glowing, hydrated skin...",
      duration: "1h",
      price: "AED 380",
      options: [{ name: "Hydrating Facial", duration: "1h", price: "AED 380" }],
    },
  ];

  // Categories with counts
  const categories = useMemo(() => {
    const categoryMap = {};

    services.forEach((service) => {
      if (categoryMap[service.category]) {
        categoryMap[service.category]++;
      } else {
        categoryMap[service.category] = 1;
      }
    });

    const result = Object.keys(categoryMap).map((key) => ({
      name: key,
      count: categoryMap[key],
    }));

    const total = result.reduce((sum, item) => sum + item.count, 0);

    return [{ name: "All categories", count: total }, ...result];
  }, [services]);

  // Filter services based on search term and selected category
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All categories" ||
        service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, services]);

  return (
    <div className="service-menu">
      {/* Header */}
      <div className="service-menu__header">
        <div className="service-menu__header-content">
          <div className="service-menu__title-section">
            <h1 className="service-menu__title">Service menu</h1>
            <p className="service-menu__subtitle">
              View and manage the services offered by your business.{" "}
              <span className="service-menu__learn-more">Learn more</span>
            </p>
          </div>
          <div className="service-menu__header-actions">
            <Button variant="outlined" className="service-menu__options-btn">
              Add
              <svg
                className="service-menu__dropdown-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="service-menu__controls">
        <div className="service-menu__search-section">
          <div className="service-menu__search-wrapper">
            <Search className="service-menu__search-icon" size={20} />
         <div className="service-menu__search-wrapper">
  <Search className="service-menu__search-icon" size={20} />
  <input
    type="text"
    className="service-menu__search-input"
    placeholder="Search service name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

          </div>
        </div>
        <div className="service-menu__manage-section"></div>
      </div>

      {/* Main Content */}
      <div className="service-menu__content">
        {/* Categories Sidebar */}
        <div className="service-menu__sidebar">
          <h3 className="service-menu__sidebar-title">Categories</h3>
          <div className="service-menu__categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`service-menu__category ${
                  selectedCategory === category.name
                    ? "service-menu__category--active"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="service-menu__category-name">
                  {category.name}
                </span>
                <span className="service-menu__category-count">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div className="service-menu__services">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-menu__service-card">
              <div className="service-menu__service-header">
                <h3 className="service-menu__service-title">
                  {service.category}
                </h3>
                <button className="service-menu__service-menu">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="service-menu__service-content">
                <div className="service-menu__service-info">
                  <h4 className="service-menu__service-name">{service.name}</h4>
                  <p className="service-menu__service-description">
                    {service.description}
                  </p>

                  <div className="service-menu__service-options">
                    {service.options.map((option, index) => (
                      <div key={index} className="service-menu__service-option">
                        <div className="service-menu__option-details">
                          <span className="service-menu__option-name">
                            {option.name}
                          </span>
                          <span className="service-menu__option-duration">
                            {option.duration}
                          </span>
                        </div>
                        <span className="service-menu__option-price">
                          {option.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="service-menu__no-results">
              <p>No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;
