import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.user);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-left d-none d-md-flex">
          <div>
            <h2 className="fw-bold text-white mb-2">Login</h2>
            <p className="text-white-50">Get access to your Orders, Wishlist and Recommendations</p>
          </div>
        </div>

        <div className="login-modal-right">
          <button className="btn-close position-absolute top-0 end-0 m-3" onClick={onClose} />

          <h5 className="fw-bold mb-1">Login or Signup</h5>
          <p className="text-muted small mb-4">to place your order on Om Vilas</p>

          <form onSubmit={handleLogin}>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="small text-muted mb-3">
              By continuing, you agree to Om Vilas Terms of Use and Privacy Policy.
            </p>
            <button className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted small">New to Om Vilas? </span>
            <Link to="/signup" className="small fw-bold text-primary" onClick={onClose}>
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
