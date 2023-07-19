import React from 'react';
import './optionspage.css';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="admin-page-container">
      <h1>Admin</h1>

      <div className="options-container">
        <div className="option">
          <h2>Staff Scheduling</h2>
          <p>Use this option to schedule shifts for staff members.</p>
          <button className="btn"><Link to="/StaffScheduling">Staff Scheduling</Link></button>
        </div>

        <div className="option">
          <h2>View Reports</h2>
          <p>Use this option to view reports and analytics.</p>
          <button className="btn"><Link to="/ReportingPage">View Reports</Link></button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
