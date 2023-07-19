import React, { useState } from 'react';
// import './App.css';
// import logo from './logo.png';
import { Link } from 'react-router-dom';


const departments = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Radiology',
];

const doctors = {
  Cardiology: ['Dr. Smith', 'Dr. Johnson', 'Dr. Brown'],
  Dermatology: ['Dr. Davis', 'Dr. Wilson', 'Dr. Anderson'],
  Endocrinology: ['Dr. Martinez', 'Dr. Taylor', 'Dr. Thomas'],
  Gastroenterology: ['Dr. Clark', 'Dr. Rodriguez', 'Dr. Lee'],
  Neurology: ['Dr. Baker', 'Dr. Lewis', 'Dr. Walker'],
  Ophthalmology: ['Dr. Hill', 'Dr. Allen', 'Dr. Green'],
  Orthopedics: ['Dr. Hall', 'Dr. Young', 'Dr. King'],
  Pediatrics: ['Dr. Wright', 'Dr. Garcia', 'Dr. Nelson'],
  Radiology: ['Dr. Harris', 'Dr. Martinez', 'Dr. Scott'],
};

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    setName('');
    setEmail('');
    setPhone('');
    setDoctor('');
    setDepartment('');
    setDate('');
    setTime('');
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setDoctor('');
  };

  return (
    <div className="container">

      <header className="header">
        <div className="logo-heading">
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        {/* <h1>Conestoga Health Services</h1> */}
        </div>

      </header>

      <main className="main">
        <div className="form-container">
          <h1 className="heading">Appointment Booking</h1>
          <form className="appointment-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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



            <label htmlFor="department">Department:</label>
            <select
              id="department"
              value={department}
              onChange={handleDepartmentChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option value={dept} key={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <label htmlFor="doctor">Doctor:</label>
            <select
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {department && doctors[department].map((doc) => (
                <option value={doc} key={doc}>
                  {doc}
                </option>
              ))}
            </select>

            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <button type="submit"><Link to="/Payment">Book Appointment</Link></button>
          </form>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2023 Your Hospital. All rights reserved.</p>
      </footer>
    </div>
    
  );
};

export default AppointmentForm;
