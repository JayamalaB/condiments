import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaClipboardCheck, FaUsers, FaRupeeSign } from "react-icons/fa";
import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/dashboard")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const stats = [
    { icon: <FaBoxOpen size={22} />, title: "Total Products", value: data?.totalProducts ?? 0, change: "In database" },
    { icon: <FaClipboardCheck size={22} />, title: "Total Orders", value: data?.totalOrders ?? 0, change: "All time" },
    { icon: <FaUsers size={22} />, title: "Customers", value: data?.totalCustomers ?? 0, change: "Registered" },
    { icon: <FaRupeeSign size={22} />, title: "Revenue", value: `₹${data?.revenue ?? 0}`, change: "Total earnings" },
  ];

  return (
    <div>
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-sm-6 col-xl-3">
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm h-100">
            <h6 className="fw-bold mb-3">Quick Actions</h6>
            <div className="d-flex flex-column gap-2">
              <a href="/admin/products" className="btn btn-outline-primary text-start">
                <FaBoxOpen className="me-2" /> Add New Product
              </a>
              <a href="/admin/orders" className="btn btn-outline-success text-start">
                <FaClipboardCheck className="me-2" /> View Pending Orders
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 shadow-sm h-100">
            <h6 className="fw-bold mb-3">Overview</h6>
            <ul className="list-unstyled mb-0">
              <li className="py-2 border-bottom d-flex justify-content-between">
                <span className="text-muted">Products listed</span>
                <strong>{data?.totalProducts ?? 0}</strong>
              </li>
              <li className="py-2 border-bottom d-flex justify-content-between">
                <span className="text-muted">Orders received</span>
                <strong>{data?.totalOrders ?? 0}</strong>
              </li>
              <li className="py-2 d-flex justify-content-between">
                <span className="text-muted">Total revenue</span>
                <strong className="text-success">₹{data?.revenue ?? 0}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
