import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: { userName } = {} } = location;

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCreateTask = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newTask = {
        name: taskName,
        description,
        user: userName,
      };

      const response = await fetch("http://localhost:8000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = {
          ...newTask,
          status: "PENDING",
          startDate: new Date(),
          endDate: null,
        };

        setTaskList([...taskList, createdTask]);

        console.log(`Task "${taskName}" created`);
        window.alert(`Task "${taskName}" created`);
      } else {
        console.log("Error creating task:", response.status);
        window.alert("Error creating task. Please try again.");
      }
    } catch (error) {
      console.log("Error creating task:", error);
      window.alert("Error creating task. Please try again.");
    }
  };

  const handleLogout = () => {
    // TODO: Perform logout logic
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Welcome to the Home Page!</h2>
        <button onClick={handleLogout}>Logout</button>
        <form style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <label>
            <input
              type="radio"
              value="toDo"
              checked={status === "toDo"}
              onChange={handleStatusChange}
            />
            To Do
          </label>
          <label>
            <input
              type="radio"
              value="onGoing"
              checked={status === "onGoing"}
              onChange={handleStatusChange}
            />
            On Going
          </label>
          <label>
            <input
              type="radio"
              value="Done"
              checked={status === "Done"}
              onChange={handleStatusChange}
            />
            Done
          </label>
          <button type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </form>
      </div>

      <div>
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>User Creator</th>
              <th>Date of Creation</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.user}</td>
                <td>{task.startDate.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
