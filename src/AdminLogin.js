import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login authentication here
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      // Clear the form
      setUsername('');
      setPassword('');
      navigate('/AdminPage');
    }
  };

  if (isLoggedIn) {
    return <h1>Welcome, {username}!</h1>;
  }

  return (
    <div className="login-container">
      <h1 className="login-title">ADMIN LOGIN</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username" className="login-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="login-input"
        />

        <label htmlFor="password" className="login-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="login-input"
        />

        <button type="submit" className="login-button">Log in</button>
      </form>
    </div>
  );
};

export default Login;
