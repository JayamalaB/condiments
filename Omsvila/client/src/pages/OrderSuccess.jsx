import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => (
  <div className="container mt-5 text-center" style={{ maxWidth: 500 }}>
    <FaCheckCircle size={72} className="text-success mb-3" />
    <h2 className="fw-bold mb-2">Order Placed!</h2>
    <p className="text-muted mb-4">
      Thank you for shopping with Om Vilas. Your order is being processed and will be delivered soon.
    </p>
    <Link to="/my-orders" className="btn btn-primary px-5 py-2 me-2">
      Track Order
    </Link>
    <Link to="/products" className="btn btn-outline-secondary px-4 py-2">
      Continue Shopping
    </Link>
  </div>
);

export default OrderSuccess;
