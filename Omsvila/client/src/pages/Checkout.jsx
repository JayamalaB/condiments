import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: user?.name || "",
    street: "",
    city: "",
    postalCode: "",
    country: "India",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>Your cart is empty</h4>
        <Link to="/products" className="btn btn-primary mt-3">Shop Now</Link>
      </div>
    );
  }

  const handlePlace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || user?._id,
          customerName: address.name,
          products: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.qty,
            weight: item.weight,
          })),
          shippingAddress: {
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
            country: address.country,
          },
          totalAmount: cartTotal,
        }),
      });
      if (!res.ok) throw new Error("Failed to place order. Please try again.");
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (label, key, type = "text", required = true) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        className="form-control"
        required={required}
        value={address[key]}
        onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Checkout</h3>
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold mb-4">Delivery Address</h5>
            <form onSubmit={handlePlace}>
              {error && <div className="alert alert-danger">{error}</div>}
              {field("Full Name", "name")}
              {field("Street / House No.", "street")}
              <div className="row g-3">
                <div className="col">{field("City", "city")}</div>
                <div className="col">{field("Postal Code", "postalCode")}</div>
              </div>
              {field("Country", "country")}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-2 fw-semibold"
                disabled={loading}
              >
                {loading ? "Placing Order..." : `Place Order · ₹${cartTotal}`}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold mb-3">Order Summary</h5>
            <p className="text-muted small mb-3">{cartItems.length} item(s)</p>
            {cartItems.map((item) => (
              <div key={item._key} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  {item.image && (
                    <img src={item.image} alt={item.name}
                      style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                  )}
                  <div>
                    <div className="fw-semibold small">{item.name}</div>
                    <div className="text-muted small">
                      {item.weight} · Qty: {item.qty}
                    </div>
                  </div>
                </div>
                <span className="fw-bold text-danger small">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5 text-danger">₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
