import React, { useEffect } from 'react';
import './optionspage.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token from local storage
    localStorage.removeItem('userToken');

    // Redirect the user to the login page
    navigate('/admin');
  };

  useEffect(() => {
    // Check if the user is logged in
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      // Redirect to the login page if not logged in
      navigate('/admin');
    }
  }, [navigate]);

  // Redirect to login if session is not valid
  useEffect(() => {
    const timer = setTimeout(() => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        navigate('/admin');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="admin-page-container">
      <h1>Admin</h1>

      <div className="options-container">
        <div className="option">
          <h2>Staff Scheduling</h2>
          <p>Use this option to schedule shifts for staff members.</p>
          <button className="btn">
            <Link to="/StaffScheduling">Staff Scheduling</Link>
          </button>
        </div>

        <div className="option">
          <h2>View Reports</h2>
          <p>Use this option to view reports and analytics.</p>
          <button className="btn">
            <Link to="/ReportingPage">View Reports</Link>
          </button>
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
