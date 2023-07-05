import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      console.log(`User: ${userName} created`);

      navigate('/home')
  
      // TODO: Handle successful login: call to repository & push the data to db
    } catch (error) {
      console.log('USER not created || ERROR on : ', error);
    }
  };
  
// Submit NO logic
  return (
    <>
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
    </>
  );
};

export default Login;
