import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUserFriends,
  FaUserTie,
  FaGift,
  FaIdCard,
  FaListAlt,
  FaClipboardList,
  FaCrown,
  FaDollarSign,
  FaMoneyBill,
  FaLayerGroup,
  FaTachometerAlt,
  FaCalendarCheck,
  FaChartBar,
  FaThLarge,
  FaTh,
  FaBars,
  FaSmile,
} from "react-icons/fa";
import "./Firstdashboard.css";

const Sidenavbar = () => {

  const menuItems = [
    { icon: <FaHome />, label: "Home", to: "/home" },
    { icon: <FaTachometerAlt />, label: "Dashboard", to: "/dashboard" },
    { icon: <FaUserFriends />, label: "Appointments", to: "/appointments" },
    { icon: <FaUserTie />, label: "Team Members", to: "/team-members" },
    { icon: <FaGift />, label: "Gift Cards", to: "/gift-cards" },
    { icon: <FaIdCard />, label: "Membership", to: "/membership" },
    { icon: <FaListAlt />, label: "Clients List", to: "/clients-list" },
    { icon: <FaClipboardList />, label: "Today & Body", to: "/today-body" },
    { icon: <FaCrown />, label: "Members", to: "/members" },
    { icon: <FaDollarSign />, label: "Daily Sales", to: "/daily-sales" },
    { icon: <FaMoneyBill />, label: "Payment Client", to: "/payment-client" },
    { icon: <FaDollarSign />, label: "Sales Page", to: "/sales-page" },
    { icon: <FaLayerGroup />, label: "Top Service", to: "/top-service" },
    { icon: <FaCalendarCheck />, label: "Scheduled Shifts", to: "/scheduled-shifts" },
    { icon: <FaChartBar />, label: "Graphs", to: "/graphs" },
    { icon: <FaCalendarAlt />, label: "Select Calendar", to: "/select-calendar" },
    { icon: <FaThLarge />, label: "Second Dashboard", to: "/second-dashboard" },
    { icon: <FaTh />, label: "First Dashboard", to: "/first-dashboard" },
    { icon: <FaBars />, label: "Navbar", to: "/navbar" },
    { icon: <FaSmile />, label: "Demo", to: "/demo" },
  ];

  return (
    <div className="sb-sidebar">
      {menuItems.map((item, index) => (
        <NavLink
          to={item.to}
          key={index}
          className={({ isActive }) =>
            `sb-icon-wrapper${isActive ? " sb-active" : ""}`
          }
          title={item.label}
        >
          <span className="sb-icon">{item.icon}</span>
          <span className="sb-label">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidenavbar;