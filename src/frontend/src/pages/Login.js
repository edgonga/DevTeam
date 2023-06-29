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
    console.log({userName})
    e.preventDefault();
  
    try {
      const response = await fetch('localhost:8000/getAllTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
  
      const userData = await response.json();
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
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
        <button type="submit" onClick={console.log("clicked")}>Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;
