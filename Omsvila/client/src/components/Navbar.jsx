import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow px-4">
      <div className="container">
        <Link className="navbar-brand fw-bold brand-logo fs-3" to="/">
          <span className="logo-orange">Om</span> <span className="logo-brown">Vilas</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FiMenu size={24} />
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
            <li className="nav-item">
              <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/features">Features</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/contact">Contact</NavLink>
            </li>
            {user && user.role !== "admin" && (
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/my-orders">My Orders</NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <span className="text-muted small">Hi, {user.name || user.email}</span>
                <button onClick={logout} className="btn btn-outline-secondary rounded-pill px-3 py-1 small">
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => "btn btn-outline-primary rounded-pill px-4 custom-login-btn" + (isActive ? " active" : "")}>
                Login
              </NavLink>
            )}

            <Link to="/cart" className="position-relative text-dark">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill custom-badge">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
