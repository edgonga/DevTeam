import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRepository, setSelectedRepository] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepositoryChange = async (e) => {
    e.preventDefault();
    const selectedRepository = e.target.value;
    setSelectedRepository(selectedRepository);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await fetch("http://localhost:8000/repository", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedRepository: selectedRepository,
        }),
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password
        }),
      });

      console.log(`User: ${userName} created`);
      window.alert(`User ${userName} created successfully.`);
      navigate("/home", { state: { userName } });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input className="input"
            type="name"
            placeholder="Name"
            value={userName}
            onChange={handleNameChange}
          />
          <input className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <select className="dropdown"
            value={selectedRepository}
            onChange={handleRepositoryChange}
          >
            <option value="json">JSON</option>
            <option value="mongo">MongoDB</option>
            <option value="mysql">MySQL</option>
          </select>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;