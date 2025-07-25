import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
import "./Appoint.css";
import api from "../Service/Api";


// Export Functions
const exportToCSV = (data) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "appointments.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = [
    "Ref #",
    "Created By",
    "Created Date",
    "Scheduled Date",
    "Duration",
    "Team Member",
    "Price",
    "Status",
  ];

  const tableRows = data.map((item) => [
    item.ref,
    item.createdBy,
    item.createdDate,
    item.scheduledDate,
    item.duration,
    item.teamMember,
    item.price,
    item.status,
  ]);

  doc.setFontSize(14);
  doc.text("Appointments Report", 14, 15);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 10 },
  });

  doc.save("appointments.pdf");
};


const exportToExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
  XLSX.writeFile(workbook, "appointments.xlsx");
};


// Update FilterPopup to accept teamMembers prop
const FilterPopup = ({ isOpen, onClose, onApply, teamMembers }) => {
  const [teamMember, setTeamMember] = useState("");
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const handleClear = () => {
    setTeamMember("");
    setStatus("");
  };

  const handleApply = () => {
    onApply({ teamMember, status });
    onClose();
  };

  return (
    <div className="filter-popup-overlay">
      <div className="pop-main">
        <h1 className="pop-head">Filters</h1>
        <div className="filter-group">
          <h3 className="pop-head2">Team Members</h3>
          <select
            value={teamMember}
            onChange={(e) => setTeamMember(e.target.value)}
          >
            <option value="">All Team Members</option>
            {teamMembers && teamMembers.map((member) => (
              <option key={member._id} value={member.name}>{member.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <h3 className="pop-head2">Status</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Booked">Booked</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Arrived">Arrived</option>
            <option value="Started">Started</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Not-Now">Not-Now</option>
          </select>
        </div>
        <div className="button-group">
          <button type="button" onClick={handleClear}>
            Clear Filters
          </button>
          <button type="button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const DateRangePicker = ({ isOpen, onClose, onApply, currentDateFilter }) => {
  const [startDate, setStartDate] = useState("2025-06-01");
  const [endDate, setEndDate] = useState("2025-06-24");
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedStartDate, setSelectedStartDate] = useState(1);
  const [selectedEndDate, setSelectedEndDate] = useState(24);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!isOpen) return null;

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = (monthOffset = 0) => {
    const month = currentMonth + monthOffset;
    const year = currentYear;
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);

    const days = [];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Add week day headers
    const headers = weekDays.map((day) => (
      <div key={day} className="calendar-header">
        {day}
      </div>
    ));

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        monthOffset === 0 &&
        (day === selectedStartDate || day === selectedEndDate);
      const isInRange =
        monthOffset === 0 && day > selectedStartDate && day < selectedEndDate;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""} ${
            isInRange ? "in-range" : ""
          }`}
          onClick={() => handleDateClick(day, monthOffset)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <div className="calendar-month-header">
          <button className="nav-button" onClick={() => navigateMonth(-1)}>
            ‹
          </button>
          <span className="month-year">
            {months[month]} {year}
          </span>
          <button className="nav-button" onClick={() => navigateMonth(1)}>
            ›
          </button>
        </div>
        <div className="calendar-grid">
          {headers}
          {days}
        </div>
      </div>
    );
  };

  const handleDateClick = (day, monthOffset) => {
    if (monthOffset === 0) {
      if (day < selectedStartDate) {
        setSelectedStartDate(day);
        setStartDate(
          `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`
        );
      } else {
        setSelectedEndDate(day);
        setEndDate(
          `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`
        );
      }
    }
  };

  const navigateMonth = (direction) => {
    if (direction === 1) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const handleApply = () => {
    onApply(`${startDate} - ${endDate}`);
    onClose();
  };

  return (
    <div className="date-picker-overlay">
      <div className="date-range-picker">
        <div className="date-range-header">
          <h2>Date range</h2>
          <div className="date-range-dropdown">
            <select className="month-dropdown">
              <option>Month to date</option>  
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>

        <div className="date-inputs">
          <div className="date-input-group">
            <label>Starting</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="date-input-group">
            <label>Ending</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        <div className="calendars-container">
          {renderCalendar(0)}
          {renderCalendar(1)}
        </div>

        <div className="action-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const Appoint = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("scheduledDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [dateFilter, setDateFilter] = useState("Month to date");
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        // Update endpoint if your actual endpoint differs
        const res = await api.get("/bookings/admin/all");
        const bookings = res.data.data.bookings || [];
        // Map backend data to frontend structure
        const mapped = bookings.map((b) => {
          const service = b.services && b.services[0] ? b.services[0] : {};
          return {
            ref: b.bookingNumber || b._id,
            createdBy: b.createdByName || (b.client ? `${b.client.firstName || ''} ${b.client.lastName || ''}` : "Unknown"),
            createdDate: b.createdAt ? new Date(b.createdAt).toLocaleString() : "-",
            scheduledDate: b.appointmentDate ? new Date(b.appointmentDate).toLocaleString() : "-",
            duration: service.duration ? `${service.duration}m` : "-",
            teamMember:
              service.employee && service.employee.user
                ? `${service.employee.user.firstName || ""} ${service.employee.user.lastName || ""}`.trim() || "-"
                : "-",
            price: service.price ? `AED ${service.price.toFixed(2)}` : (b.finalAmount ? `AED ${b.finalAmount.toFixed(2)}` : "-"),
            status: b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : "-",
          };
        });
        setAppointments(mapped);
        setFilteredAppointments(mapped);
      } catch (err) {
        setError("Failed to load appointments. Please try again.");
        setAppointments([]);
        setFilteredAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();

    // Fetch team members (employees)
    const fetchTeamMembers = async () => {
      try {
        const res = await api.get("/employees");
        const employees = res.data.data.employees || [];
        const mapped = employees.map(emp => ({
          _id: emp._id,
          name: emp.user ? `${emp.user.firstName || ''} ${emp.user.lastName || ''}`.trim() : emp.employeeId || 'Unknown'
        }));
        setTeamMembers(mapped);
      } catch (err) {
        setTeamMembers([]);
      }
    };
    fetchTeamMembers();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = appointments.filter(
      (appointment) =>
        appointment.ref.toLowerCase().includes(value.toLowerCase()) ||
        appointment.createdBy.toLowerCase().includes(value.toLowerCase()) ||
        appointment.teamMember.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...filteredAppointments].sort((a, b) => {
      if (direction === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
    setFilteredAppointments(sorted);
  };

  const handleDateFilterApply = (newDateFilter) => {
    setDateFilter(newDateFilter);
  };

  const handleFilterApply = (filters) => {
    console.log("Filters Applied:", filters);
    // Apply filter logic here
    let filtered = appointments;

    if (filters.teamMember) {
      filtered = filtered.filter((appointment) =>
        appointment.teamMember
          .toLowerCase()
          .includes(filters.teamMember.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredAppointments(filtered);
  };

  return (
    <div className="schedule-main-wrapper">
      <div className="schedule-content-container">
        {/* Header */}
        <div className="page-header-section">
          <div className="header-flex-container">
            <div className="title-description-block">
              <h1 className="page-primary-title">Appointments</h1>
              <p className="page-description-text">
                View, filter and export appointments booked by your clients.
              </p>
            </div>
            <div className="export-controls-wrapper">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="export-trigger-button"
              >
                Export
                <ChevronDown className="button-icon" />
              </button>
              {showExportMenu && (
                <div className="export-dropdown-menu">
                  <div className="dropdown-menu-inner">
                    <button className="dropdown-menu-item" onClick={() => exportToCSV(filteredAppointments)}>
  Export as CSV
</button>
<button className="dropdown-menu-item" onClick={() => exportToPDF(filteredAppointments)}>
  Export as PDF
</button>
<button className="dropdown-menu-item" onClick={() => exportToExcel(filteredAppointments)}>
  Export as Excel
</button>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-controls-section">
          <div className="search-input-wrapper">
            <Search className="search-field-icon" />
            <input
              type="text"
              placeholder="Search by Reference or Client"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-text-input"
            />
          </div>

          <div className="filter-button-group">
            <div className="filter-select-wrapper">
              <button
                className="filter-control-button"
                onClick={() => setShowDatePicker(true)}
              >
                <Calendar className="button-icon" />
                {dateFilter}
                <ChevronDown className="button-icon" />
              </button>
            </div>

            <button
              onClick={() => setShowFilterPopup(true)}
              className="filter-control-button"
            >
              <Filter className="button-icon" />
              Filters
            </button>

            <div className="filter-select-wrapper">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="filter-control-button"
              >
                <ArrowUpDown className="button-icon" />
                {`Sort: ${
                  sortField === "scheduledDate" && sortDirection === "desc"
                    ? "Scheduled Date (newest first)"
                    : "Custom"
                }`}
                <ChevronDown className="button-icon" />
              </button>
              {showSortMenu && (
                <div className="export-dropdown-menu">
                  <div className="dropdown-menu-inner">
                    {[
                      {
                        label: "Created Date (oldest first)",
                        value: "createdDate_asc",
                      },
                      {
                        label: "Created Date (newest first)",
                        value: "createdDate_desc",
                      },
                      {
                        label: "Scheduled Date (oldest first)",
                        value: "scheduledDate_asc",
                      },
                      {
                        label: "Scheduled Date (newest first)",
                        value: "scheduledDate_desc",
                      },
                      {
                        label: "Duration (Shortest first)",
                        value: "duration_asc",
                      },
                      {
                        label: "Duration (Longest first)",
                        value: "duration_desc",
                      },
                      { label: "Price (Lowest first)", value: "price_asc" },
                      { label: "Price (Highest first)", value: "price_desc" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        className="dropdown-menu-item"
                        onClick={() => {
                          const [field, direction] = opt.value.split("_");
                          setSortField(field);
                          setSortDirection(direction);
                          const sorted = [...filteredAppointments].sort(
                            (a, b) => {
                              if (direction === "asc")
                                return a[field] > b[field] ? 1 : -1;
                              else return a[field] < b[field] ? 1 : -1;
                            }
                          );
                          setFilteredAppointments(sorted);
                          setShowSortMenu(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="data-table-container">
          <div className="table-scroll-wrapper">
            <table className="schedule-data-table">
              <thead className="data-table-head">
                <tr>
                  <th
                    className="column-header-cell clickable-header"
                    onClick={() => handleSort("ref")}
                  >
                    <div className="column-header-content">
                      Ref #
                      <ArrowUpDown className="button-icon" />
                    </div>
                  </th>
                  <th
                    className="column-header-cell clickable-header"
                    onClick={() => handleSort("createdBy")}
                  >
                    <div className="column-header-content">
                      Created by
                      <ArrowUpDown className="button-icon" />
                    </div>
                  </th>
                  <th
                    className="column-header-cell clickable-header"
                    onClick={() => handleSort("createdDate")}
                  >
                    <div className="column-header-content">
                      Created Date
                      <ArrowUpDown className="button-icon" />
                    </div>
                  </th>
                  <th
                    className="column-header-cell clickable-header"
                    onClick={() => handleSort("scheduledDate")}
                  >
                    <div className="column-header-content">
                      Scheduled Date
                      <ChevronDown className="button-icon" />
                    </div>
                  </th>
                  <th
                    className="column-header-cell clickable-header"
                    onClick={() => handleSort("duration")}
                  >
                    <div className="column-header-content">
                      Duration
                      <ArrowUpDown className="button-icon" />
                    </div>
                  </th>
                  <th className="column-header-cell">Team member</th>
                  <th
                    className="column-header-cell clickable-header"
                    onClick={() => handleSort("price")}
                  >
                    <div className="column-header-content">
                      Price
                      <ArrowUpDown className="button-icon" />
                    </div>
                  </th>
                  <th className="column-header-cell">Status</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {loading && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>Loading appointments...</td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", color: "red" }}>{error}</td>
                  </tr>
                )}
                {filteredAppointments.map((appointment, index) => (
                  <tr key={index} className="data-row-item">
                    <td className="data-cell-content">
                      <span className="reference-link-text">
                        {appointment.ref}
                      </span>
                    </td>
                    <td className="data-cell-content">
                      {appointment.createdBy}
                    </td>
                    <td className="data-cell-content secondary-text">
                      {appointment.createdDate}
                    </td>
                    <td className="data-cell-content emphasized-text">
                      {appointment.scheduledDate}
                    </td>
                    <td className="data-cell-content secondary-text">
                      {appointment.duration}
                    </td>
                    <td className="data-cell-content">
                      {appointment.teamMember}
                    </td>
                    <td className="data-cell-content emphasized-text">
                      {appointment.price}
                    </td>
                    <td className="data-cell-content">
                      <span
                        className={`status-indicator-badge ${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="mobile-card-layout">
          <div className="card-list-container">
            {loading && (
              <div style={{ textAlign: "center", margin: "2rem" }}>Loading appointments...</div>
            )}
            {error && (
              <div style={{ color: "red", textAlign: "center", margin: "2rem" }}>{error}</div>
            )}
            {filteredAppointments.map((appointment, index) => (
              <div key={index} className="schedule-card-item">
                <div className="card-top-section">
                  <span className="card-reference-number">
                    {appointment.ref}
                  </span>
                  <span
                    className={`status-indicator-badge ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div className="card-details-section">
                  <div className="card-info-row">
                    <span className="info-label-text">Created by:</span>
                    <span className="info-value-text">
                      {appointment.createdBy}
                    </span>
                  </div>
                  <div className="card-info-row">
                    <span className="info-label-text">Scheduled:</span>
                    <span className="info-value-text emphasized-text">
                      {appointment.scheduledDate}
                    </span>
                  </div>
                  <div className="card-info-row">
                    <span className="info-label-text">Team member:</span>
                    <span className="info-value-text">
                      {appointment.teamMember}
                    </span>
                  </div>
                  <div className="card-info-row">
                    <span className="info-label-text">Duration:</span>
                    <span className="info-value-text">
                      {appointment.duration}
                    </span>
                  </div>
                  <div className="card-info-row">
                    <span className="info-label-text">Price:</span>
                    <span className="info-value-text emphasized-text">
                      {appointment.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredAppointments.length === 0 && !loading && !error && (
          <div className="no-results-state">
            <p className="no-results-message">
              No appointments found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Date Range Picker Popup */}
      <DateRangePicker
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onApply={handleDateFilterApply}
        currentDateFilter={dateFilter}
      />

      {/* Filter Popup */}
      <FilterPopup
        isOpen={showFilterPopup}
        onClose={() => setShowFilterPopup(false)}
        onApply={handleFilterApply}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default Appoint;
