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
    { icon: <FaCalendarAlt />, label: "Calendar", to: "/calendar" },
    { icon: <FaSalesforce />, label: "Sales", to: "/sales" },
    { icon: <FaUserFriends />, label: "Appointments", to: "/appointments" },
    { icon: <FaUserTie />, label: "Team", to: "/catalog" },
    { icon: <FaThLarge />, label: "Catalog", to: "/team" },
    // { icon: <FaIdCard />, label: "Clients", to: "/clients-list" },
    { icon: <FaTachometerAlt />, label: "Dashboard", to: "/dashboard" },
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
        >
          <span className="sb-icon">{item.icon}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidenavbar;