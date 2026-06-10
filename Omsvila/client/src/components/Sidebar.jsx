import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard", icon: <FaHome />, label: "Dashboard" },
  { to: "/admin/products", icon: <FaBox />, label: "Products" },
  { to: "/admin/orders", icon: <FaClipboardList />, label: "Orders" },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div
      className="admin-sidebar d-flex flex-column p-3"
      style={{ width: 230, minHeight: "100vh", background: "#1a1a2e", color: "white", flexShrink: 0 }}
    >
      <div className="mb-4 px-2">
        <h5 className="fw-bold mb-0" style={{ color: "#e75b0c" }}>Om Vilas</h5>
        <small className="text-white-50">Admin Panel</small>
      </div>

      <ul className="nav flex-column gap-1 flex-grow-1">
        {navItems.map((item) => (
          <li key={item.to} className="nav-item">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 fw-medium ${
                  isActive ? "bg-primary text-white" : "text-white-50"
                }`
              }
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        onClick={logout}
        className="btn btn-outline-light btn-sm d-flex align-items-center gap-2 mt-3"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
