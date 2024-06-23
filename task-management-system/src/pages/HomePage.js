import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1>More than 1 million businesses manage their work with Zoho Projects.</h1>
        <h2>Follow the crowd. Do yourself proud.</h2>
        <Link to="/login" className="login-link">Sign up</Link>
      </div>
    </div>
  );
};

export default HomePage;
