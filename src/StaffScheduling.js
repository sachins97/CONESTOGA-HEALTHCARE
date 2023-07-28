import React, { useState, useEffect } from 'react';
import './StaffScheduling.css';

const StaffScheduling = () => {
  const [staffList, setStaffList] = useState([]);
  const [shiftForm, setShiftForm] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const updateShift = async (value,staffId, date) => {
    console.log(value, staffId, date)
    try {
      const API_URL = 'http://localhost:8080/updateShift'
      const response = await fetch(`${API_URL}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            ShiftType: value,
            staffId: staffId,
            date: date
          }
        ),
      });
      const data = await response.json();
      console.log(data)
    } catch(err) {
      console.log(err)
    }
  }
  const fetchData = async () => {
    try {
      const API_BASE_URL = 'http://localhost:8080'; // Replace with your API URL
      const response = await fetch(`${API_BASE_URL}/doctors-and-staff`);
      const data = await response.json();
      setStaffList(data);

      // Initialize the shiftForm state with empty shifts for each staff member
      const shiftFormData = {};
      data.forEach((staff) => {
        shiftFormData[staff.StaffId] = {
          Sunday: '',
          Monday: '',
          Tuesday: '',
          Wednesday: '',
          Thursday: '',
          Friday: '',
          Saturday: '',
        };
      });
      setShiftForm(shiftFormData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const currentMonth = currentDate.toLocaleString('default', {
    month: 'short',
  });

  const handleShiftChange = (staffId, day, value) => {
    // Update the shiftForm state with the new shift value
    setShiftForm((prevShiftForm) => ({
      ...prevShiftForm,
      [staffId]: {
        ...prevShiftForm[staffId],
        [day]: value,
      },
    }));
  };

  const renderShiftOptions = (staffId, day) => {
    // console.log('sssss', staffId)
    const handleShiftChange = (e) => {
      const { value } = e.target.value;
      updateShift(e.target.value, staffId, day)
      // handleShiftChange(staffId, day, value);
      
    };

    return (
      <select value={shiftForm[staffId][day]} onChange={handleShiftChange}>
        <option value="">-</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Night">Night</option>
      </select>
    );
  };

  const renderScheduleTable = () => {
    return (
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Role</th>
            {daysOfWeek.map((day, index) => {
              const date = new Date();
              date.setDate(currentDate.getDate() - currentDayIndex + index);
              const dayOfMonth = date.getDate();
              const formattedDate = `${day}, ${dayOfMonth} ${currentMonth}`;

              return <th key={day}>{formattedDate}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.StaffId}>
              <td>{staff.StaffId}</td>
              <td>{staff.Name}</td>
              <td>{staff.Role}</td>
              {daysOfWeek.map((day) => (
                <td key={day}>{renderShiftOptions(staff.StaffId, day)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handlePublishShifts = async () => {
    try {
      const API_BASE_URL = 'http://localhost:8080'; // Replace with your API URL

      const response = await fetch(`${API_BASE_URL}/publishshifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shiftForm),
      });

      if (response.status === 200) {
        console.log('Shifts Published!');
      } else {
        console.log('Failed to publish shifts.');
      }
    } catch (error) {
      console.error('An error occurred while publishing shifts.', error);
    }
  };

  return (
    <div className="staff-scheduling-container">
      <h2>Staff Scheduling</h2>
      {renderScheduleTable()}
      <button className="publish-button" onClick={handlePublishShifts}>
        Publish Shifts
      </button>
    </div>
  );
};

export default StaffScheduling;
