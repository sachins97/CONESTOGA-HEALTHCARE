import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ConfirmationPage from './ConfirmationPage';
import Payment from './Payment';

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [patientIdInput, setPatientIdInput] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [doctorsByDepartment, setDoctorsByDepartment] = useState({});
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handlePaymentOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
    console.log("payment option =" ,setSelectedPaymentOption(e.target.value));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // You can implement any necessary logic here based on the selected payment option.
    // For example, you can call an API to make the actual payment transaction.
    // For this example, we'll just show a confirmation message.
    setError('');
    if (selectedPaymentOption === 'insurance') {
      // Handle insurance payment
      setSelectedPaymentOption(null); // Reset selected payment option after confirmation
    } else if (selectedPaymentOption === 'credit_debit') {
      // Handle credit/debit card payment
      // Redirect to the payment gateway page
      // For demonstration purposes, we'll just show a confirmation message
      setSelectedPaymentOption(null); // Reset selected payment option after confirmation
    }
  };

  const generatePaymentId = () => {
    // Generate a random number between 1 and 999
    const randomNum = Math.floor(Math.random() * 999) + 1;
    // Pad the number with leading zeros to make it a 3-digit number
    return `PID${randomNum.toString().padStart(3, '0')}`;
  };

  const PaymentGateway = () => {
  
    // Function to handle payment form submission
    const handlePaymentSubmit = async (e) => {
      e.preventDefault();
      // You can implement the payment processing logic here, e.g., calling a payment API
      // For this example, we'll just generate a paymentId and pass the payment details to the parent component
      const paymentId = generatePaymentId();
      const paymentData = {
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        // Add other payment details as needed
      };
      // await onSubmitPayment(paymentId); // Wait for the onSubmitPayment function to complete
      // this.props.history.push('/ConfirmationPage'); // Navigate to the confirmation page
    };
    return (
      <div>
      <h2>Payment Gateway</h2>
      <form>
        {/* Add payment form fields here, e.g., card number, expiration date, etc. */}
        <label htmlFor="cardNumber">Card Number:</label>
    <input
      type="text"
      id="cardNumber"
     
           required
    />

    <label htmlFor="expirationDate">Expiration Date:</label>
    <input
              type="month"
              id="expirationDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
    
       
       
      </form>
    </div>
    
    
    );
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

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic for submitting the form data and booking the appointment
      setError('');

      console.log('Selected Doctor ID:', doctor);
      console.log('Selected Payment Option:', selectedPaymentOption);

      // Save the appointment data to the database if insurance payment is selected
      if (selectedPaymentOption === 'insurance') {
        const appointmentData = {
          patientrecordid: patientIdInput, // Assuming patientId is fetched from the API
          doctorid: doctor, // Assuming doctorid is available in the 'doctor' state
          date: date,
          time: time,
        };
        const response = await axios.post('http://localhost:8080/appointments', appointmentData);
        console.log('Appointment saved:', response.data);
      }else if (selectedPaymentOption === 'credit_debit') {
        const paymentId = generatePaymentId();
        const appointmentData = {
          patientrecordid: patientIdInput,
          doctorid: doctor,
          date: date,
          time: time,
          paymentid: paymentId,
        };
  
        const response = await axios.post('http://localhost:8080/appointments', appointmentData);
        console.log('Appointment saved:', response.data);
      }

      // Resetting the form after successful submission
      setName('');
      setPhone('');
      setDoctor('');
      setDepartment('');
      setDate('');
      setTime('');

      // Optionally, you can navigate to the confirmation page here
      // depending on your application flow.
    } catch (error) {
      // Handle any errors that occur during form submission
      setError('An error occurred while booking the appointment.');
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    setDoctor('');
    fetchDoctorsByDepartment(selectedDepartment); // Fetch doctors for the selected department
  };
  const handlePatientIdChange = (e) => {
    setPatientIdInput(e.target.value);
    setSearchedPatient(null);
  };

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    setDoctor(selectedDoctorId); // Set the selected doctor ID to the 'doctor' state
    setSelectedDoctorId(selectedDoctorId); // Set the selected doctor ID to the 'selectedDoctorId' state
  };

  const searchPatient = async () => {
    try {
      setError('');
      // Fetch patient details based on the entered patient ID
      const response = await axios.get(`http://localhost:8080/patients/${patientIdInput}`);
      setSearchedPatient(response.data);
    } catch (error) {
      // Handle the case when patient ID is not found in the database
      setError('Patient ID not found in the database.');
    }
  };
  // Fetch doctors by department from the server when the department changes
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

  return (
    <div className="container">
     
      <main className="main">
        <div className="container">
          <h1 className="heading">Appointment Booking</h1>
          <form className="appointment-form" onSubmit={handleSubmit}>
            {/* Other form inputs (name, email, phone, etc.) as in your original code */}
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="text"
              id="patientId"
              value={patientIdInput}
              onChange={handlePatientIdChange}
              required
            />
            <button type="button" onClick={searchPatient}>
              Search Patient
            </button>
            {error && <p className="error">{error}</p>}
            {searchedPatient && (
              <div>
                {/* Display patient details if found */}
                <h2>Patient Details</h2>
                <p>Name: {searchedPatient.Name}</p>
                <p>Phone: {searchedPatient.Phone}</p>
                {/* Include any other patient details you want to display */}
              </div>
            )}

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

            <label htmlFor="paymentOption">Payment Option:</label>
            <select
              id="paymentOption"
              value={selectedPaymentOption}
              onChange={handlePaymentOptionChange}
              required
            >
              <option value="">Select Payment Option</option>
              <option value="insurance">Insurance</option>
              <option value="credit_debit">Payment via Credit/Debit</option>
            </select>

            {/* Conditionally render the confirmation page or the payment gateway page */}
            {selectedPaymentOption === 'insurance' ? (
   <button type="submit" onClick={handleSubmit}>
   <Link to="/ConfirmationPage">Book Appointment</Link>
 </button>
) : selectedPaymentOption === 'credit_debit' ? (
  <>
    <PaymentGateway />
    <button type="submit" onClick={handleSubmit}>
   <Link to="/ConfirmationPage">Submit Payment</Link>
   </button>
  </>
) : null}

          </form>
        </div>
      </main>
     
    </div>
  );
};

export default AppointmentForm;
