import React, { useState } from 'react';
import './StaffScheduling.css';
import Header from './Header';
import Footer from './Footer';

const StaffScheduling = () => {
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Receptionist',
      shifts: ['', '', '', '', '', '', ''],
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Doctor',
      shifts: ['', '', '', '', '', '', ''],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Receptionist',
      shifts: ['', '', '', '', '', '', ''],
    },
    {
      id: 4,
      name: 'Emily Brown',
      role: 'Doctor',
      shifts: ['', '', '', '', '', '', ''],
    },
  ]);

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

  const renderShiftOptions = (staffIndex, dayIndex) => {
    const handleShiftChange = (e) => {
      const updatedStaffList = [...staffList];
      updatedStaffList[staffIndex].shifts[dayIndex] = e.target.value;
      setStaffList(updatedStaffList);
    };

    return (
      <select
        value={staffList[staffIndex].shifts[dayIndex]}
        onChange={handleShiftChange}
      >
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
          {staffList.map((staff, staffIndex) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              {staff.shifts.map((shift, dayIndex) => (
                <td key={dayIndex}>
                  {renderShiftOptions(staffIndex, dayIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handlePublishShifts = () => {
    // Logic to publish shifts
    console.log('Shifts Published!');
  };

  return (
    <div className="staff-scheduling-container">
      <Header />
      <h2>Staff Scheduling</h2>
      {renderScheduleTable()}
      <button className="publish-button" onClick={handlePublishShifts}>
        Publish Shifts
      </button>
      <Footer />
    </div>
  );
};

export default StaffScheduling;
