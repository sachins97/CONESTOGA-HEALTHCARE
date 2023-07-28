import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAppointments.css';
import { Routes, Route } from 'react-router-dom';

const ViewAppointments = () => {
  const [date, setDate] = useState('');
     const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [department, setDepartment] = useState('');
     const [selectedDoctorId, setSelectedDoctorId] = useState('');
     const [doctor, setDoctor] = useState('');
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]); // Initialize as an empty array
  const [doctorsByDepartment, setDoctorsByDepartment] = useState({});
 

 

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    setDoctor(selectedDoctorId); // Set the selected doctor ID to the 'doctor' state
    setSelectedDoctorId(selectedDoctorId); // Set the selected doctor ID to the 'selectedDoctorId' state
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment); // Set the selected department to the 'department' state
    setDoctor('');
    fetchDoctorsByDepartment(selectedDepartment); // Fetch doctors for the selected department
  };
  
  const fetchDoctorsByDepartment = async (selectedDepartment) => {
    try {
      setError('');
      if (selectedDepartment) {
        const response = await axios.get(`http://localhost:8080/doctors/${selectedDepartment}`);
        console.log('Doctors Data:', response.data);
        
        setDoctorsByDepartment((prevDoctorsByDept) => ({
          ...prevDoctorsByDept,
          [selectedDepartment]: response.data,
        }));
      } else {
        // If no department is selected, clear the doctor list
        setDoctorsByDepartment({});
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    // Fetch department names from the server when the component mounts
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/departments'); // Replace with the actual API endpoint
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setError('');
      const response = await axios.get('http://localhost:8080/appointments', {
        params: {
          date : date,
          doctorid: selectedDoctorId
         // You need to define patientIdInput in your component's state
        },
      });
      console.log('Appointments Data:', response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Error fetching appointments. Please try again later.');
    }
  };




  return (
    <div className="view-appointments">
      <h1>View Appointments</h1>

      <form onSubmit={handleSearch} >
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
              value={selectedDoctorId} // Use selectedDoctorId instead of doctor
              onChange={handleDoctorChange} // Use the new handler function
              required
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {department &&
                doctorsByDepartment[department]?.map((doc) => (
                  <option value={doc.DoctorId} key={doc.DoctorId}>
                    {doc.Name}
                  </option>
                ))}
            </select>


          <button type="submit">Search</button>
        </div>
      </form>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>AppoitmentID</th>
            <th>PatientId</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.AppointmentId}</td>
                <td>{appointment.PatientRecordId}</td>
                <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
                <td>{new Date(appointment.time).toLocaleTimeString('en-US')}</td>
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
