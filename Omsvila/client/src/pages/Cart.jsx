import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

const Cart = () => {
  const { cartItems, incrementQty, decrementQty, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-3">Your Cart is Empty</h2>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary mt-2">Shop Now</Link>
      </div>
    );
  }

  return (
    <>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            navigate("/checkout");
          }}
        />
      )}

      <div className="container my-5" style={{ maxWidth: 760 }}>
        <h2 className="mb-4 fw-bold">My Cart ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})</h2>

        <div className="d-flex flex-column gap-3">
          {cartItems.map((item) => (
            <div className="card shadow-sm" key={item._key}>
              <div className="card-body d-flex align-items-center gap-3 flex-wrap">

                {/* Product image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
                  />
                )}

                {/* Name + weight badge */}
                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-1">{item.name}</h5>
                  <span className="badge bg-warning text-dark px-2 py-1" style={{ fontSize: "0.75rem" }}>
                    {item.weight}
                  </span>
                  <div className="text-muted small mt-1">₹{item.price} per pack</div>
                </div>

                {/* Qty stepper */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 32, height: 32, padding: 0, borderRadius: 6 }}
                    onClick={() => decrementQty(item._key)}
                  >
                    −
                  </button>
                  <span className="fw-bold fs-5" style={{ minWidth: 24, textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 32, height: 32, padding: 0, borderRadius: 6 }}
                    onClick={() => incrementQty(item._key)}
                  >
                    +
                  </button>
                </div>

                {/* Item total + remove */}
                <div className="text-end" style={{ minWidth: 90 }}>
                  <div className="fw-bold text-danger fs-5">₹{item.price * item.qty}</div>
                  <button
                    className="btn btn-link btn-sm text-danger p-0 mt-1"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => removeFromCart(item._key)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order total + actions */}
        <div className="card mt-4 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <span className="text-muted">Order Total </span>
              <span className="text-danger fw-bold fs-4 ms-1">₹{cartTotal}</span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="btn btn-primary px-4 fw-semibold" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
