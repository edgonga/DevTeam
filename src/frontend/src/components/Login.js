import React, { useState } from 'react';

const Login = () => {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
  
      const userData = await response.json(); // Assuming the response contains the user data
  
      // TODO: Save user data to MongoDB
      // Make another fetch request to your backend to save the user data in MongoDB
  
      // Example:
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // TODO: Handle successful login
      // For example, store the user token in local storage and redirect to another page
    } catch (error) {
      // TODO: Handle login error
      // Display an error message to the user
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="name"
          placeholder="name"
          value={userName}
          onChange={handleNameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;