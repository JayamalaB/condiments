import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

const statusColor = {
  Processing: "bg-warning text-dark",
  Shipped: "bg-info text-white",
  Delivered: "bg-success text-white",
  Cancelled: "bg-danger text-white",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/orders")
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await axios.put(`http://localhost:5000/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Orders ({orders.length})</h5>
        <button className="btn btn-sm btn-outline-primary" onClick={fetchOrders}>
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="card p-5 text-center shadow-sm">
          <p className="text-muted mb-0">No orders received yet.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div key={order._id} className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                  <div>
                    <span className="text-muted small me-2">Order ID:</span>
                    <strong className="small">#{order._id.slice(-8).toUpperCase()}</strong>
                    <span className="text-muted small ms-3">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge px-3 py-2 ${statusColor[order.status] || "bg-secondary text-white"}`}>
                      {order.status}
                    </span>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 140 }}
                      value={order.status}
                      disabled={updating === order._id}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-5">
                    <p className="small fw-semibold text-muted mb-1">CUSTOMER</p>
                    <p className="mb-0 fw-semibold">{order.customerName || "—"}</p>
                  </div>
                  <div className="col-md-4">
                    <p className="small fw-semibold text-muted mb-1">DELIVERY ADDRESS</p>
                    <p className="mb-0 small">
                      {order.shippingAddress?.street}, {order.shippingAddress?.city}
                      <br />
                      {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                    </p>
                  </div>
                  <div className="col-md-3 text-md-end">
                    <p className="small fw-semibold text-muted mb-1">ORDER TOTAL</p>
                    <p className="mb-0 fw-bold text-danger fs-5">₹{order.totalAmount}</p>
                  </div>
                </div>

                <hr className="my-3" />
                <p className="small fw-semibold text-muted mb-2">ITEMS ORDERED</p>
                <div className="d-flex flex-wrap gap-2">
                  {order.products.map((p, i) => (
                    <span key={i} className="badge bg-light text-dark border px-3 py-2 small">
                      {p.name} {p.weight ? `(${p.weight})` : ""} × {p.quantity} — ₹{p.price * p.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
