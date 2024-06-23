import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand-logo">
          Zoho Projects
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/tasks/new" className="nav-link">
              New Task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
