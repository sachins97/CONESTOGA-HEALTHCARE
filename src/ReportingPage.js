import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportingPage.css';

const ReportingPage = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [malePatients, setMalePatients] = useState(0);
  const [femalePatients, setFemalePatients] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const totalAppointmentsResponse = await axios.get('http://localhost:8080/total_appointments');
      setTotalPatients(totalAppointmentsResponse.data[0]?.total_appointments || 0);

      const maleCountResponse = await axios.get('http://localhost:8080/male_count');
      setMalePatients(maleCountResponse.data[0]?.MALE_COUNT || 0);

      const femaleCountResponse = await axios.get('http://localhost:8080/female_count');
      setFemalePatients(femaleCountResponse.data[0]?.FEMALE_COUNT || 0);

      const averageAgeResponse = await axios.get('http://localhost:8080/average_age');
      setAverageAge(averageAgeResponse.data[0]?.AverageAge || 0);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Sample report data
  const reports = [
    { title: 'Total Patients', value: totalPatients },
    { title: 'Male Patients', value: malePatients },
    { title: 'Female Patients', value: femalePatients },
    { title: 'Average Age', value: averageAge },
  ];

  return (
    <div className="reporting-page">
      <h1>Reporting / Analytics / Statistics</h1>

      <div className="reports-container">
        {reports.map((report, index) => (
          <div className="report" key={index}>
            <h2>{report.title}</h2>
            <p>{report.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportingPage;
