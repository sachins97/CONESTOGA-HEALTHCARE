import React, { useState } from 'react';
import './ViewAppointments.css';
import { Routes, Route } from 'react-router-dom';

const ViewAppointments = () => {
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const appointments = [
    {
      id: 1,
      date: '2023-07-18',
      department: 'Cardiology',
      doctor: 'Dr. Smith',
    },
    {
      id: 2,
      date: '2023-07-19',
      department: 'Orthopedics',
      doctor: 'Dr. Johnson',
    },
    {
      id: 3,
      date: '2023-07-20',
      department: 'Dermatology',
      doctor: 'Dr. Brown',
    },
    {
      id: 4,
      date: '2023-07-20',
      department: 'Gastroenterology',
      doctor: 'Dr. Davis',
    },
    {
      id: 5,
      date: '2023-07-20',
      department: 'Ophthalmology',
      doctor: 'Dr. Wilson',
    },
    {
      id: 3,
      date: '2023-07-20',
      department: 'Dermatology',
      doctor: 'Dr. Brown',
    },
    {
      id: 4,
      date: '2023-07-21',
      department: 'Gastroenterology',
      doctor: 'Dr. Davis',
    },
    {
      id: 5,
      date: '2023-07-22',
      department: 'Ophthalmology',
      doctor: 'Dr. Wilson',
    },
  ];

  // List of departments and doctors
  const departments = [
    'Cardiology',
    'Orthopedics',
    'Dermatology',
    'Gastroenterology',
    'Ophthalmology',
  ];
  const doctors = [
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Brown',
    'Dr. Davis',
    'Dr. Wilson',
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter appointments based on search criteria
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const searchDate = new Date(date);

      // Check if the appointment date matches the search criteria
      const isDateMatch = date
        ? appointmentDate.toDateString() === searchDate.toDateString()
        : true;

      // Check if the department matches the search criteria
      const isDepartmentMatch = department
        ? appointment.department.toLowerCase() === department.toLowerCase()
        : true;

      // Check if the doctor matches the search criteria
      const isDoctorMatch = doctor
        ? appointment.doctor.toLowerCase().includes(doctor.toLowerCase())
        : true;

      // Return true if all search criteria match
      return isDateMatch && isDepartmentMatch && isDoctorMatch;
    });

    setFilteredAppointments(filtered);
  };

  return (
    <div className="view-appointments">
      <h1>View Appointments</h1>

      <form onSubmit={handleSearch}>
        <div className="filters">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <label htmlFor="doctor">Doctor:</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">All</option>
            {doctors.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>

          <button type="submit">Search</button>
        </div>
      </form>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Department</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.date}</td>
                <td>{appointment.department}</td>
                <td>{appointment.doctor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppointments;
