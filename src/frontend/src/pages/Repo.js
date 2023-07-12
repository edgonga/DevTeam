import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Repo = () => {

    const [selectedRepository, setSelectedRepository] = useState("");
  
    const navigate = useNavigate();

  
    const handleRepositoryChange = (e) => {
      setSelectedRepository(e.target.value);
    };
  
    const handleRepo = async (e) => {
      e.preventDefault();
  
      try {
  
        await fetch("http://localhost:8000/repo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedRepository
          }),
        });
        window.alert(`Repository with ${selectedRepository} created succesfully.`)
        navigate("/home");
  
        // TODO: Handle successful login: call to repository & push the data to db
      } catch (error) {
        console.log("REPO not created || ERROR on : ", error);
      }
    };
  
    return (
      <>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleRepo}>
            
            <button type="submit">Login</button>
            <select value={selectedRepository} onChange={handleRepositoryChange}>
              <option value="json">JSON</option>
              <option value="mongo">MongoDB</option>
              <option value="mysql">MySQL</option>
            </select>
          </form>
        </div>
      </>
    );
  };

export default Repo