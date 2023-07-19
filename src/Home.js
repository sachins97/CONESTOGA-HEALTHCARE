import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import StaffLogin from './StaffLogin';
import DoctorLogin from './DoctorLogin';
import AdminLogin from './AdminLogin';
import './Home.css';
import StaffPage from './StaffPage';
import AdminPage from './AdminPage';
import DoctorPage from './DoctorPage';
import App from './App';
import ManageAppointment from './ManageAppointment';
import PatientRegistration from './PatientRegistration';
import StaffScheduling from './StaffScheduling';
import ReportingPage from './ReportingPage';
import ViewPatientData from './ViewPatientData';
import Prescription from './Prescription';
import ViewAppointments from './ViewAppointments';
import Payment from './Payment';




const Home = () => {
  return (
    <div>
      <header>
        <h1>Hospital Management System</h1>
      </header>
      <nav>
        
        <div className="buttons">
          
          <Link to="/staff">Staff</Link>
          
          
          <Link to="/doctor">Doctor</Link>
          
          
          <Link to="/admin">Admin</Link>
          
          </div>
        
      </nav>
      <section>
        <h2>Contact Us</h2>
        <p>
          Phone: 123-456-7890<br />
          Email: info@example.com<br />
          Address: 123 Main Street, City, Country
        </p>
      </section>
      <footer>&copy; 2023 Hospital Management System. All rights reserved.</footer>
    </div>
  );
};

const HomePage = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staff/*" element={<StaffLogin />} />
        <Route path="/doctor/*" element={<DoctorLogin />} />
        <Route path="/admin/*" element={<AdminLogin />} />
        <Route path="/StaffPage" element = {<StaffPage />}/>
        <Route path="/AdminPage" element = {<AdminPage />}/>
        <Route path="/ReportingPage" element = {<ReportingPage />}/>
        <Route path="/DoctorPage" element = {<DoctorPage />}/>
        <Route path="/App" element = {<App />}/>
        <Route path="/ManageAppointment" element = {<ManageAppointment />}/>
        <Route path="/PatientRegistration" element = {<PatientRegistration />}/>
        <Route path="/StaffScheduling" element = {<StaffScheduling />}/>
        <Route path="/ViewPatientData" element = {<ViewPatientData />}/>
        <Route path="/Prescription" element = {<Prescription />}/>
        <Route path="/ViewAppointments" element = {<ViewAppointments />}/>
        <Route path="/Payment" element = {<Payment />}/>
        
      </Routes>
      <Outlet />
    </div>
  );
};

export default HomePage;
