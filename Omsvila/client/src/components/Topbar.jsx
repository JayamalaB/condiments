import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/products": "Manage Products",
  "/admin/orders": "Manage Orders",
};

const Topbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const title = pageTitles[pathname] || "Admin";

  return (
    <div className="bg-white px-4 py-3 shadow-sm d-flex justify-content-between align-items-center">
      <h5 className="m-0 fw-bold">{title}</h5>
      <div className="d-flex align-items-center gap-2">
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: 36, height: 36, fontSize: 14 }}
        >
          A
        </div>
        <span className="small fw-semibold text-muted">{user?.email || "Admin"}</span>
      </div>
    </div>
  );
};

export default Topbar;
