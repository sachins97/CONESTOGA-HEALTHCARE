import React, { useEffect } from 'react';
import './optionspage.css';
import { Link, useNavigate } from 'react-router-dom';

const StaffPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token from local storage
    localStorage.removeItem('userToken');

    // Redirect the user to the login page
    navigate('/Staff');
  };

  useEffect(() => {
    // Check if the user is logged in
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      // Redirect to the login page if not logged in
      navigate('/Staff');
    }
  }, [navigate]);

  // Redirect to login if session is not valid
  useEffect(() => {
    const timer = setTimeout(() => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        navigate('/Staff');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="staff-page-container">
      <h1>Staff</h1>

      <div className="options-container">
        <div className="option">
          <h2>Book An Appointment</h2>
          <p>Use this option to book an appointment for a patient.</p>
          <button className="btn">
            <Link to="/app">Book Appointments</Link>
          </button>
        </div>

        <div className="option">
          <h2>Manage Appointment</h2>
          <p>Use this option to manage existing appointments.</p>
          <button className="btn">
            <Link to="/ManageAppointment">Manage Appointments</Link>
          </button>
        </div>

        <div className="option">
          <h2>Register Patient</h2>
          <p>
            Use this option to register a new patient with medical background.
          </p>
          <button className="btn">
            <Link to="/PatientRegistration">Register Patient</Link>
          </button>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default StaffPage;
