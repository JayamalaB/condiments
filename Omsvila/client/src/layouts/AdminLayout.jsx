import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => (
  <div className="admin-shell d-flex" style={{ minHeight: "100vh" }}>
    <Sidebar />
    <div className="flex-grow-1 d-flex flex-column">
      <Topbar />
      <div className="admin-content flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AdminLayout;
