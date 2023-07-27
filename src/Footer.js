import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="/">App</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
            <li>
              <a href="/">Business</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Centers of Excellence</h4>
          <ul>
            <li>
              <a href="/">Cardiac</a>
            </li>
            <li>
              <a href="/">Neurosciences</a>
            </li>
            <li>
              <a href="/">Orthopaedics</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>About The Site</h4>
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Customer Support</a>
            </li>
            <li>
              <a href="/">Payment Security</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="copy">
        &copy; 2023 Hospital Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
