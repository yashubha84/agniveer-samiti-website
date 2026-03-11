import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <img src="/logo.jpg.jpg" alt="Logo" className="logo-img" />
            <span className="logo-text">અખિલ ગુજરાત અગ્નિવીર સમિતિ</span>
          </Link>
          
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/districts">Districts</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/member-register">Join Us</Link></li>
            <li><Link to="/volunteer-register">Volunteer</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            
            {user ? (
              <>
                <li>
                  <Link to={
                    user.role === 'state_admin' ? '/admin-dashboard' : 
                    user.role === 'district_admin' ? '/district-dashboard' : 
                    '/member-dashboard'
                  }>
                    Dashboard
                  </Link>
                </li>
                <li><button onClick={onLogout} className="btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className="btn">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
