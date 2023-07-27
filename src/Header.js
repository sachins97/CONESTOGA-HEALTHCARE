import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <a href="/">Find A Doctor</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">Research</a>
          </li>
          <li>
            <a href="/">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="navbar">
        <div className="logo">
          <img src="/assets/logo.jpg" alt="Your Logo" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="/">Hospitals</a>
            </li>
            <li>
              <a href="/">Services</a>
            </li>
            <li>
              <a href="/">Treatment</a>
            </li>
            <li>
              <a href="/">Quick Enquiry</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
