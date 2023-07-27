import React, { useState } from 'react';
import './ViewPatientData.css';
import { Link } from 'react-router-dom';

const DoctorViewPatientData = () => {
  const [searchValue, setSearchValue] = useState('');
  const [patientData, setPatientData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Replace the API_BASE_URL with the actual API endpoint for fetching patient data
      const API_BASE_URL = 'http://localhost:8080'; // Replace with your API URL
      const response = await fetch(`${API_BASE_URL}/patientprescription/${searchValue}`);
      const data = await response.json();

      if (response.status === 200) {
        setPatientData(data);
      } else if (response.status === 404) {
        setPatientData(null);
        console.log('Patient data not found.');
      } else {
        console.log('An error occurred while fetching patient data.');
        console.log(data); // Log the API response for debugging
      }
    } catch (error) {
      console.error('An error occurred while fetching patient data.', error);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setPatientData(null);
  };

  const handleAddPrescription = () => {
    // Logic to navigate to the Add Prescription page with the patient ID as a URL parameter
    if (patientData) {
      const patientId = patientData.PatientRecordId;
      const patientName = patientData.Name;
      // Use the `Link` component to navigate and pass the patient ID and name as URL parameters
      return (
        <Link to={`/Prescription/${patientId}?name=${patientName}`}>
          <button type="button">Add Prescription</button>
        </Link>
      );
    }
    // If patientData is not available, return null or any other fallback content
    return null;
  };

  return (
    <div className="patient-data-container">
      <h2>Search Patient</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter patient name or ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear Search
        </button>
      </form>

      {patientData ? (
        <>
          <h2>Patient Details</h2>
          <div className="patient-details">
            <div>
              <strong>Name:</strong> {patientData.Name}
            </div>
            <div>
              <strong>ID:</strong> {patientData.PatientRecordId}
            </div>
            <div>
              <strong>DOB:</strong> {patientData.Dob}
            </div>
            <div>
              <strong>Gender:</strong> {patientData.Gender}
            </div>
            <div>
              <strong>Phone:</strong> {patientData.Phone}
            </div>
            <div>
              <strong>Address:</strong> {patientData.Address}
            </div>
            <div>
              <strong>Insurance Number:</strong> {patientData.InsuranceNumber}
            </div>
          </div>

          {patientData.pastVisits && patientData.pastVisits.length > 0 ? (
            <>
              <h2>Past Visits</h2>
              <table className="visit-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.pastVisits.map((visit, index) => (
                    <tr key={index}>
                      <td>{visit.date}</td>
                      <td>{visit.diagnosis}</td>
                      <td>{visit.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No past visits found.</p>
          )}

          {patientData.prescriptions && patientData.prescriptions.length > 0 ? (
            <>
              <h2>Prescriptions</h2>
              <table className="prescription-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.prescriptions.map((prescription, index) => (
                    <tr key={index}>
                      <td>{prescription.Date}</td>
                      <td>{prescription.Medication}</td>
                      <td>{prescription.Dosage}</td>
                      <td>{prescription.Frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No prescriptions found.</p>
          )}

          <center>{handleAddPrescription()}</center>
        </>
      ) : (
        <p>No patient data found.</p>
      )}
    </div>
  );
};

export default DoctorViewPatientData;
