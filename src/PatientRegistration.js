import React, { useState } from 'react';
import './PatientRegistration.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [insurance, setInsurance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/PatientRegistration',
        {
          name,
          dateOfBirth,
          gender,
          address,
          phone,
          insurance,
        }
      );

      if (response.data === 'INSERT Successful') {
        console.log('PatientData Created');
        // Redirect to the StaffPage component
        navigate('/StaffPage');
      } else {
        setErrorMessage('Patient registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Register Patient</h1>
      <form class="form"onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="">Insurance:</label>
        <input
          type="number"
          id="insurance"
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          required
        />

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterPatient;
