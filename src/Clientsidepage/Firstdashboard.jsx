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
  FaSalesforce,
} from "react-icons/fa";
import "./Firstdashboard.css";

const Sidenavbar = () => {

  const menuItems = [
    { icon: <FaHome />, label: "Home", to: "/" },
    { icon: <FaCalendarAlt />, label: "Dashboard", to: "/calendar" },

    { icon: <FaSalesforce />, label: "Dashboard", to: "/sales-sidebar" },

    { icon: <FaUserFriends />, label: "Appointments", to: "/clients-list" },
    { icon: <FaUserTie />, label: "Team Members", to: "/catalog-sidebar" },
    { icon: <FaGift />, label: "Gift Cards", to: "/team-sidebar" },
    { icon: <FaIdCard />, label: "Membership", to: "/dashboard" },

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
       
        </NavLink>
      ))}
    </div>
  );
};

export default Sidenavbar;