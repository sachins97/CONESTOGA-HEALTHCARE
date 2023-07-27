import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/AdminLogin', {
        username,
        password,
      });

      if (response.data === 'Login Successful') {
        // Store user token in local storage
        localStorage.setItem('userToken', 'dummyToken');
        // Redirect to the StaffPage component
        navigate('/AdminPage');
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
      <form className="login-form">
        <h2>Admin Login</h2>
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
    </div>
  );
}

export default AdminLogin;
