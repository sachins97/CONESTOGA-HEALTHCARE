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
import Header from './Header';
import Footer from './Footer';
//import logo from './assets/logo.jpg';

const Home = () => {
  return (
    <html>
      <Header />
      <main>
        <div class="content">
          <h1>CONESTOGA SUPER SPECIALITY HOSPITAL ,WATERLOO</h1>
          <h2>Get Directions | Contact Us</h2>
          <button class="buttons">Need Help</button>
        </div>
        <div class="hosp">
          <img src="/assets/hosp.jpg" alt="Your hosp" />
        </div>
      </main>
      <div class="cards">
        <article class="destCards">
          <img src="/assets/admin.jpg" alt="" />

          <button class="btn">
            <Link to="/admin">Admin</Link>
          </button>
        </article>
        <article class="destCards">
          <img src="/assets/doctor.jpg" alt="" />

          <button class="btn">
            <Link to="/doctor">Doctor</Link>
          </button>
        </article>
        <article class="destCards">
          <img src="/assets/staff.jpg" alt="" />
          <button class="btn">
            <Link to="/staff">Staff</Link>
          </button>
        </article>
      </div>
      <div class="about">
        <h3>ABOUT US</h3>
        <p>
          Conestoga Super Speciality Hospital, Mohali is a unit of Hometrail
          Buildtech Pvt. Ltd., offering services across medical disciplines of
          Neurosciences, Cardiac Sciences, Cancer Care, Orthopaedics,
          Obstetrics, and Gynaecology among several others. The 200+ bed
          healthcare facility is equipped with Medical Intensive Care Unit
          (MICU), Surgical Intensive Care Unit (SICU), Critical Care Unit (CCU),
          and Cath Labs and Cath Labs. The team of experts understand the
          health-related problems and offer personalized care to patients. With
          83 ICU beds, eight HDU beds, and eight high-end modular Operation
          Theatres, Max Super Speciality Hospital, Mohali is home to the latest
          medical technology. And under the guidance of over 80 leading doctors
          and medical experts, and nursing staff of over 350 nurses, the entire
          h...
        </p>
      </div>
      <Footer />
    </html>
  );
};

const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staff/*" element={<StaffLogin />} />
        <Route path="/doctor/*" element={<DoctorLogin />} />
        <Route path="/admin/*" element={<AdminLogin />} />
        <Route path="/StaffPage" element={<StaffPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/ReportingPage" element={<ReportingPage />} />
        <Route path="/DoctorPage" element={<DoctorPage />} />
        <Route path="/App" element={<App />} />
        <Route path="/ManageAppointment" element={<ManageAppointment />} />
        <Route path="/PatientRegistration" element={<PatientRegistration />} />
        <Route path="/StaffScheduling" element={<StaffScheduling />} />
        <Route path="/ViewPatientData" element={<ViewPatientData />} />
        <Route path="/Prescription" element={<Prescription />} />
        <Route path="/ViewAppointments" element={<ViewAppointments />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default HomePage;
