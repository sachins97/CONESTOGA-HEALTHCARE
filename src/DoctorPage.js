import React from 'react';
import './optionspage.css';
import { Link } from 'react-router-dom';

const DoctorPage = () => {
  return (
    <div className="doctor-page-container">
      <h1>Doctor</h1>

      <div className="options-container">
        <div className="option">
          <h2>View Patient Data</h2>
          <p>Use this option to view patient data and medical records.</p>
          <button className="btn"><Link to="/ViewPatientData">View Patient Data</Link></button>
        </div>

        <div className="option">
          <h2>Other Option</h2>
          <p>Use this option for any other functionality or task.</p>
          <button className="btn">Other Option</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
