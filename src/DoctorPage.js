import React, { useEffect } from 'react';
import './optionspage.css';
import { Link, useNavigate } from 'react-router-dom';

const DoctorPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token from local storage
    localStorage.removeItem('userToken');

    // Redirect the user to the login page
    navigate('/Doctor');
  };

  useEffect(() => {
    // Check if the user is logged in
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      // Redirect to the login page if not logged in
      navigate('/Doctor');
    }
  }, [navigate]);

  // Redirect to login if session is not valid
  useEffect(() => {
    const timer = setTimeout(() => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        navigate('/Doctor');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="doctor-page-container">
      <h1>Doctor</h1>

      <div className="options-container">
        <div className="option">
          <h2>View Patient Data</h2>
          <p>Use this option to view patient data and medical records.</p>
          <button className="btn">
            <Link to="/ViewPatientData">View Patient Data</Link>
          </button>
        </div>

        <div className="option">
          <h2>Other Option</h2>
          <p>Use this option for any other functionality or task.</p>
          <button className="btn">Other Option</button>
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DoctorPage;
