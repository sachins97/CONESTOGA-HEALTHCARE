import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

function DoctorLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/DoctorLogin', {
        username,
        password,
      });

      if (response.data === 'Login Successful') {
        // Store user token in local storage
        localStorage.setItem('userToken', 'dummyToken');
        // Redirect to the StaffPage component
        navigate('/DoctorPage');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Doctor Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <Footer />
    </div>
  );
}

export default DoctorLogin;
