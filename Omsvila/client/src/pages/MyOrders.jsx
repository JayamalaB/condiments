import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBoxOpen } from "react-icons/fa";

const STEPS = ["Processing", "Shipped", "Delivered"];

const StatusTracker = ({ status }) => {
  if (status === "Cancelled") {
    return (
      <div className="d-flex align-items-center gap-2 mt-2">
        <span className="badge bg-danger px-3 py-2">Cancelled</span>
        <span className="text-muted small">This order was cancelled.</span>
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="d-flex align-items-center mt-3">
      {STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <React.Fragment key={step}>
            <div className="d-flex flex-column align-items-center" style={{ minWidth: 70 }}>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: 32,
                  height: 32,
                  background: done ? "#e75b0c" : "#e0e0e0",
                  color: done ? "white" : "#aaa",
                  fontSize: 13,
                  boxShadow: active ? "0 0 0 3px rgba(231,91,12,0.25)" : "none",
                  transition: "all 0.3s",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <div
                className="mt-1 text-center"
                style={{
                  fontSize: 11,
                  fontWeight: done ? 600 : 400,
                  color: done ? "#e75b0c" : "#aaa",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  height: 3,
                  flex: 1,
                  background: i < currentIndex ? "#e75b0c" : "#e0e0e0",
                  marginBottom: 18,
                  borderRadius: 2,
                  transition: "background 0.3s",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const userId = user.id || user._id;
    fetch(`http://localhost:5000/orders/user/${userId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch orders");
        return r.json();
      })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setError("Could not load your orders. Please try again."))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mt-5 text-center py-5">
        <FaBoxOpen size={64} className="text-muted mb-3" />
        <h4 className="fw-bold mb-2">No Orders Yet</h4>
        <p className="text-muted mb-4">You haven't placed any orders. Start shopping!</p>
        <Link to="/products" className="btn btn-primary px-5">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: 800 }}>
      <h3 className="fw-bold mb-4">My Orders</h3>

      <div className="d-flex flex-column gap-4">
        {orders.map((order) => (
          <div key={order._id} className="card shadow-sm">
            {/* Order header */}
            <div
              className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2"
              style={{ background: "#fffdf4", borderBottom: "1px solid #f0e8dc" }}
            >
              <div>
                <span className="text-muted small me-2">Order</span>
                <strong className="small">#{order._id.slice(-8).toUpperCase()}</strong>
              </div>
              <div className="text-muted small">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div>
                <span className="text-muted small me-1">Total:</span>
                <strong className="text-danger">₹{order.totalAmount}</strong>
              </div>
            </div>

            <div className="card-body">
              {/* Items */}
              <div className="mb-3">
                {order.products.map((p, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: i < order.products.length - 1 ? "1px solid #f5f5f5" : "none" }}
                  >
                    <div>
                      <span className="fw-semibold">{p.name}</span>
                      {p.weight && (
                        <span className="badge bg-warning text-dark ms-2 px-2" style={{ fontSize: "0.7rem" }}>
                          {p.weight}
                        </span>
                      )}
                      <span className="text-muted small ms-2">× {p.quantity}</span>
                    </div>
                    <span className="fw-semibold text-danger small">
                      ₹{p.price * p.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery address */}
              {order.shippingAddress?.city && (
                <div className="small text-muted mb-3">
                  <span className="fw-semibold text-dark">Deliver to: </span>
                  {order.shippingAddress.street}, {order.shippingAddress.city} —{" "}
                  {order.shippingAddress.postalCode}
                </div>
              )}

              {/* Status tracker */}
              <StatusTracker status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
