import React, { useState } from 'react';
import './ViewPatientData.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const DoctorViewPatientData = () => {
  const [searchValue, setSearchValue] = useState('');
  const [patientData, setPatientData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    // Example: Dummy data for demonstration
    const patientRecords = [
      {
        name: 'John Doe',
        id: 'PT001',
        age: 30,
        address: '123 Main Street, City, Country',
        pastVisits: [
          {
            date: '2022-01-05',
            diagnosis: 'Fever',
            notes: 'Prescribed rest and fluids',
          },
          {
            date: '2022-03-12',
            diagnosis: 'Headache',
            notes: 'Prescribed pain relievers',
          },
          {
            date: '2022-06-18',
            diagnosis: 'Cough',
            notes: 'Prescribed cough syrup',
          },
        ],
        prescriptions: [
          {
            date: '2022-01-05',
            medication: 'Paracetamol',
            dosage: '500mg',
            frequency: 'Twice a day',
          },
          {
            date: '2022-03-12',
            medication: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'As needed',
          },
          {
            date: '2022-06-18',
            medication: 'Cough Syrup',
            dosage: '10ml',
            frequency: 'Three times a day',
          },
        ],
      },
      {
        name: 'Jane Smith',
        id: 'PT002',
        age: 25,
        address: '456 Elm Street, City, Country',
        pastVisits: [
          {
            date: '2022-02-10',
            diagnosis: 'Allergy',
            notes: 'Prescribed antihistamines',
          },
          {
            date: '2022-04-20',
            diagnosis: 'Stomachache',
            notes: 'Prescribed antacids',
          },
          {
            date: '2022-07-05',
            diagnosis: 'Sprained ankle',
            notes: 'Prescribed pain medication and rest',
          },
        ],
        prescriptions: [
          {
            date: '2022-02-10',
            medication: 'Antihistamines',
            dosage: '10mg',
            frequency: 'Once a day',
          },
          {
            date: '2022-04-20',
            medication: 'Antacids',
            dosage: '2 tablets',
            frequency: 'As needed',
          },
          {
            date: '2022-07-05',
            medication: 'Pain Medication',
            dosage: '500mg',
            frequency: 'As needed',
          },
        ],
      },
    ];

    // Search for the patient based on the searchValue
    const foundPatient = patientRecords.find(
      (patient) =>
        patient.name.toLowerCase() === searchValue.toLowerCase() ||
        patient.id.toLowerCase() === searchValue.toLowerCase()
    );

    setPatientData(foundPatient);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setPatientData(null);
  };

  const handleAddPrescription = () => {
    // Logic to navigate to the Add Prescription page or component
    console.log('Navigate to Add Prescription');
  };

  return (
    <div className="patient-data-container">
      <Header />
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
              <strong>Name:</strong> {patientData.name}
            </div>
            <div>
              <strong>ID:</strong> {patientData.id}
            </div>
            <div>
              <strong>Age:</strong> {patientData.age}
            </div>
            <div>
              <strong>Address:</strong> {patientData.address}
            </div>
          </div>

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
                  <td>{prescription.date}</td>
                  <td>{prescription.medication}</td>
                  <td>{prescription.dosage}</td>
                  <td>{prescription.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <center>
            <button type="button" onClick={handleAddPrescription}>
              <Link to="/Prescription">Add Prescription</Link>
            </button>
          </center>
        </>
      ) : (
        <p>No patient data found.</p>
      )}
      <Footer />
    </div>
  );
};

export default DoctorViewPatientData;
