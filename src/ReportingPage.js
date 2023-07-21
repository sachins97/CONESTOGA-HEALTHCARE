import React from 'react';
import './ReportingPage.css';
import Header from './Header';
import Footer from './Footer';

const ReportingPage = () => {
  // Sample report data
  const reports = [
    { title: 'Total Patients', value: 150 },
    { title: 'Average Appointment Duration', value: '30 minutes' },
    { title: 'Total Revenue', value: '$50,000' },
    {
      title: 'Popular Specialties',
      value: ['Cardiology', 'Orthopedics', 'Dermatology'],
    },
  ];

  return (
    <div className="reporting-page">
      <Header />
      <h1>Reporting / Analytics / Statistics</h1>

      <div className="reports-container">
        {reports.map((report, index) => (
          <div className="report" key={index}>
            <h2>{report.title}</h2>
            <p>{report.value}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ReportingPage;
