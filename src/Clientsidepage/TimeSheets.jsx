import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Calendar, 
  Filter, 
  ChevronDown, 
  ArrowUpDown,
  MoreHorizontal 
} from 'lucide-react';
import './Timesheets.css';

const Timesheets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('This week');
  const [sortBy, setSortBy] = useState('Date (newest first)');

  const timesheetData = [
    {
      id: 1,
      name: 'Icha Faradisa',
      initials: 'IF',
      location: 'Ailore Spa and Massage Centre Dubai',
      date: 'Fri, 4 Jul 2025',
      clockIn: '11:39',
      clockOut: null,
      breaks: '-',
      hoursWorked: '-',
      status: 'Clocked in',
      statusType: 'active'
    },
    {
      id: 2,
      name: 'Dayu Eka',
      initials: 'DE',
      location: 'Ailore Spa and Massage Centre Dubai',
      date: 'Thu, 3 Jul 2025',
      clockIn: '12:00',
      clockOut: '21:00',
      breaks: '-',
      hoursWorked: '11h',
      status: 'Clocked out',
      statusType: 'completed'
    }
  ];

  const filteredData = timesheetData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarColor = (initials) => {
    const colors = {
      'IF': '#e0e7ff',
      'DE': '#dcfce7'
    };
    return colors[initials] || '#f3f4f6';
  };

  const getStatusStyle = (statusType) => {
    const styles = {
      'active': {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        border: '1px solid #3b82f6'
      },
      'completed': {
        backgroundColor: '#dcfce7',
        color: '#166534',
        border: '1px solid #16a34a'
      }
    };
    return styles[statusType] || styles.completed;
  };

  return (
    <div className="timesheets-container">
      {/* Header */}
      <div className="timesheets-header">
        <div className="header-left">
        
          <div className="header-content">
            <h1>Timesheets</h1>
            <p>Manage your team members' timesheets</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="options-btn">
            Options <ChevronDown size={16} />
          </button>
          <button className="add-btn">
            Add
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-bar">
        <div className="search-section">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="week-filter-btn">
            <Calendar size={16} />
            {selectedWeek}
          </button>
          <button className="filter-btn">
            <Filter size={16} />
          </button>
        </div>
        <button className="sort-btn">
          <ArrowUpDown size={16} />
          {sortBy}
        </button>
      </div>

      {/* Table */}
<div className="timesheets-table-container">
  <table className="timesheets-table">
    <thead>
      <tr>
        <th className="team-member-col">Team member</th>
        <th className="date-col">Date <ChevronDown size={14} /></th>
        <th className="clock-col">Clock in/out <ChevronDown size={14} /></th>
        <th className="breaks-col">Breaks <ChevronDown size={14} /></th>
        <th className="hours-col">Hours worked</th>
        <th className="status-col">Status</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((item) => (
        <tr key={item.id} className="table-row">
          <td className="team-member-cell">
            <div className="member-info">
              <div className="avatar" style={{ backgroundColor: getAvatarColor(item.initials) }}>
                {item.initials}
              </div>
              <div className="member-details">
                <div className="member-name">{item.name}</div>
                <div className="member-location">{item.location}</div>
              </div>
            </div>
          </td>
          <td className="date-cell">{item.date}</td>
          <td className="clock-cell">
            {item.clockOut ? `${item.clockIn} - ${item.clockOut}` : item.clockIn}
          </td>
          <td className="breaks-cell">{item.breaks}</td>
          <td className="hours-cell">{item.hoursWorked}</td>
          <td className="status-cell">
            <span className="status-badge" style={getStatusStyle(item.statusType)}>
              {item.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Timesheets;