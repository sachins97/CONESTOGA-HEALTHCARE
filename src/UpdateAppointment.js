import React, { Component } from 'react';
import axios from 'axios';

class UpdateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentIdInput: '',
      appointmentDetails: null,
      newDate: '',
      newTime: '',
      error: '',
    };
  }
  

  handleAppointmentIdChange = (e) => {
    this.setState({ appointmentIdInput: e.target.value });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const { appointmentIdInput } = this.state;

    try {
      const response = await axios.get(`http://localhost:8080/appointments/${appointmentIdInput}`);
      this.setState({ appointmentDetails: response.data, newDate: '', newTime: '', error: '' });
    } catch (error) {
      console.error('Error fetching appointment:', error);
      this.setState({
        appointmentDetails: null,
        newDate: '',
        newTime: '',
        error: 'Error fetching appointment. Please try again.',
      });
    }
  };

  handleDateChange = (e) => {
    this.setState({ newDate: e.target.value });
  };

  handleTimeChange = (e) => {
    this.setState({ newTime: e.target.value });
  };
   
  handleUpdate = async (e) => {
    e.preventDefault();
    const { appointmentDetails, newDate, newTime } = this.state;

    try {
      await axios.put(`http://localhost:8080/appointments/${appointmentDetails.AppointmentId}`, {
        date: newDate || appointmentDetails.date,
        time: newTime || appointmentDetails.time,
      });
      // Optional: Fetch updated appointment details and display them after successful update
      const response = await axios.get(`http://localhost:8080/appointments/${appointmentDetails.AppointmentId}`);
      this.setState({ appointmentDetails: response.data, newDate: '', newTime: '', error: 'Appointment updated successfully' });
    } catch (error) {
      console.error('Error updating appointment:', error);
      this.setState({ error: 'Error updating appointment. Please try again.' });
    }
  };

  render() {
    const { appointmentIdInput, appointmentDetails, newDate, newTime, error } = this.state;

    return (
      <div className="appointment">
        <h1>Update Appointment</h1>

        <form class="form" onSubmit={this.handleSearch}>
          <label htmlFor="appointmentId">Appointment ID:</label>
          <input
            type="text"
            id="appointmentId"
            value={appointmentIdInput}
            onChange={this.handleAppointmentIdChange}
            required
          />
          <button type="submit">Search</button>
        </form>

        {appointmentDetails && (
          <form onSubmit={this.handleUpdate}>
            <div className="appointment-details">
              <label>Doctor ID: {appointmentDetails.DoctorId}</label>
              <label>Patient ID: {appointmentDetails.PatientRecordId}</label>
              <label>Date: {appointmentDetails.date.slice(0, 10)}</label>
              <label>Time: {appointmentDetails.time.slice(11, 19)}</label>
            </div>

            <div className="update-fields">
              <label htmlFor="newDate">New Date:</label>
              <input
                type="date"
                id="newDate"
                value={newDate}
                onChange={this.handleDateChange}
              />

              <label htmlFor="newTime">New Time:</label>
              <input
                type="time"
                id="newTime"
                value={newTime}
                onChange={this.handleTimeChange}
              />
            </div>

            <button type="submit">Update Appointment</button>
          </form>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default UpdateAppointment;
