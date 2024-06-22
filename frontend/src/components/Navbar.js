import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
