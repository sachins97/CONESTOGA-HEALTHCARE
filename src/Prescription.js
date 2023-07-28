import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Prescription = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientName = queryParams.get('name');

  // Console log to check if 'patientId' is set correctly
  console.log('Patient ID:', patientId);

  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_BASE_URL = 'http://localhost:8080'; // Replace with your API URL

      const response = await fetch(`${API_BASE_URL}/addprescription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: patientId, // Use 'patientId' variable here
          medication,
          dosage,
          frequency,
        }),
      });

      if (response.status === 201) {
        console.log('Prescription added successfully.');
        // Clear the form after successful submission
        setMedication('');
        setDosage('');
        setFrequency('');
      } else {
        console.log('Failed to add prescription.');
      }
    } catch (error) {
      console.error('An error occurred while adding prescription.', error);
    }
  };

  return (
    <div>
      <h1>Prescription Page</h1>
      {patientName ? (
        <p>Patient Name: {patientName}</p>
      ) : (
        <p>Patient name not found in the URL parameters.</p>
      )}
      

      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Medication:
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            required
          />
        </label>
        <label>
          Dosage:
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </label>
        <label>
          Frequency:
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Prescription</button>
      </form>
    </div>
  );
};

export default Prescription;
