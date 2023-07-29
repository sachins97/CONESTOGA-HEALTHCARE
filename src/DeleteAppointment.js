import React, { Component } from 'react';
import axios from 'axios';


class DeleteAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentIdInput: '',
      appointmentDetails: null,
      error: '',
    };
  }

  handleSearch = async (e) => {
    e.preventDefault();
    const { appointmentIdInput } = this.state;

    try {
      const response = await axios.get(`http://localhost:8080/appointments/${appointmentIdInput}`);
      this.setState({ appointmentDetails: response.data, error: '' });
    } catch (error) {
      console.error('Error fetching appointment:', error);
      this.setState({ appointmentDetails: null, error: 'Appointment not found. Please try again.' });
    }
  };

  handleDelete = async () => {
    const { appointmentDetails } = this.state;

    try {
      await axios.delete(`http://localhost:8080/appointments/${appointmentDetails.AppointmentId}`);
      this.setState({ appointmentDetails: null, appointmentIdInput: '', error: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      this.setState({ error: 'Error deleting appointment. Please try again.' });
    }
  };

  render() {
    const { appointmentIdInput, appointmentDetails, error } = this.state;

    return (
      <div className="delete-appointment">
        <h1>Delete Appointment</h1>

        <form class="form" onSubmit={this.handleSearch}>
          <div className="search-fields">
            <label htmlFor="appointmentIdInput">Appointment ID:</label>
            <input
              type="text"
              id="appointmentIdInput"
              value={appointmentIdInput}
              onChange={(e) => this.setState({ appointmentIdInput: e.target.value })}
            />
            <button type="submit">Search</button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        {appointmentDetails && (
          <div className="appointment">
            <h2>Appointment Details</h2>
            <p>Appointment ID: {appointmentDetails.AppointmentId}</p>
            <p>Date: {appointmentDetails.date.slice(0, 10)}</p>
            <p>Time: {appointmentDetails.time.slice(11, 19)}</p>
            <button class="btn"onClick={this.handleDelete}>Delete Appointment</button>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteAppointment;
