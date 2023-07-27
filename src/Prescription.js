import React, { useState } from 'react';
import './Prescription.css';

const medicineNames = [
  'Aspirin',
  'Ibuprofen',
  'Paracetamol',
  'Amoxicillin',
  'Lisinopril',
  'Simvastatin',
  'Metformin',
  'Omeprazole',
  'Albuterol',
  'Fluoxetine',
  'Gabapentin',
  'Hydrochlorothiazide',
];

const dosageOptions = [
  '1mg',
  '5mg',
  '10mg',
  '25mg',
  '50mg',
  '100mg',
  '250mg',
  '500mg',
  '750mg',
  '1000mg',
];

const frequencyOptions = [
  'Once a day',
  'Twice a day',
  'Three times a day',
  'Every 4 hours',
  'Every 6 hours',
  'Every 8 hours',
  'As needed',
];

const AddPrescription = () => {
  const [patientName, setPatientName] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [filteredMedicineNames, setFilteredMedicineNames] = useState([]);

  const handleMedicationChange = (e) => {
    const value = e.target.value;
    setMedication(value);

    // Filter medicine names based on input value
    const filteredNames = medicineNames.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMedicineNames(filteredNames);
  };

  const handleMedicationSelect = (name) => {
    setMedication(name);
    setFilteredMedicineNames([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform prescription submission logic here
    // You can save the prescription details to a database or perform any other required operations

    // Clear the form after submission
    setPatientName('');
    setMedication('');
    setDosage('');
    setFrequency('');
    setNotes('');
    setFilteredMedicineNames([]);
  };

  return (
    <div className="container">
      <h1>Add Prescription</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patient-name">Patient Name:</label>
        <input
          type="text"
          id="patient-name"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />

        <label htmlFor="medication">Medication:</label>
        <input
          type="text"
          id="medication"
          placeholder="Enter medication name"
          value={medication}
          onChange={handleMedicationChange}
          required
        />
        {filteredMedicineNames.length > 0 && (
          <ul className="medicine-list">
            {filteredMedicineNames.map((name) => (
              <li key={name} onClick={() => handleMedicationSelect(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}

        <label htmlFor="dosage">Dosage:</label>
        <select
          id="dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
        >
          <option value="">Select dosage</option>
          {dosageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="frequency">Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        >
          <option value="">Select frequency</option>
          {frequencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="notes">Additional Notes:</label>
        <textarea
          id="notes"
          placeholder="Enter additional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button type="submit">Add Prescription</button>
      </form>
    </div>
  );
};

export default AddPrescription;
