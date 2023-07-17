import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: { userName } = {} } = location;
  const [selectedStatus, setSelectedStatus] = useState(0)
  const [taskToFind, setFindTask] = useState("")

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
      } else {
        console.log("Error creating task:", response.status);
        window.alert("Error creating task.");
      }
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

  const handleDeleteTask = async (taskName) => {
    try {
      const response = await fetch("http://localhost:8000/deleteTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskName,
        }),
      });

      if (response.ok) {
        const updatedTaskList = taskList.filter((task) => task.name !== taskName);
        setTaskList(updatedTaskList);

        console.log(`Task "${taskName}" deleted`);
      } else {
        console.log("Error deleting task:", response.status);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
      window.alert("Error deleting task. Please try again.");
    }
  };

  const handleStatusUpdate = async (task, newStatus) => {
    
    const newStatusSelected = parseInt(newStatus);
    setSelectedStatus(newStatusSelected);
    
    try {
      const response = await fetch("http://localhost:8000/updateTask/" + task.name, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          name : task.name,
          description : task.description
        }),
      });

      if (response.ok) {
        const updatedTaskList = taskList.map((e) => {
          if (e.name === task.name) {
            console.log(e);
            return {
              name : e.name,
              description : e.description, 
              status: newStatus,
              startDate : e.startDate,
              user : e.user,
            };
          }
          return e;
        });

        setTaskList(updatedTaskList);

        console.log(`Task "${taskName}" updated with status "${newStatus}"`);
      } else {
        console.log("Error updating task:", response.status);
      }
    } catch (error) {
      console.log("Error updating task:", error);
      window.alert("Error updating task. Please try again.");
    }
  };

  const handleFindTasK = async(taskToFind) => {
    try {

      const response = await fetch("http://localhost:8000/findTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskName,
        }),
      });
      if (response.ok) {
        setFindTask(taskToFind);
        console.log(`Task "${taskToFind}" founded`);
      } else {
        console.log("Error finding task:", response.status);
      }


    } catch (error) {
      console.log("Error updating task:", error);
      window.alert("Error updating task. Please try again.");
    }
  }

  const handleLogout = () => {
    // TODO: Perform logout logic
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Welcome to the Home Page!</h2>
        <form className="form-input">
          <input className="input"
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <input className="input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          
          
          <button className="button" type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </form>
      </div>

      <div>
        <h2>Task List</h2>
        {taskList.map((task, index) => (
          <div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Task Description</th>
        <th>Status</th>
        <th>User Creator</th>
        <th>Creation Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td><div className="checkbox-container">
            <label>
            <input
              type="radio"
              value={0}
              checked={selectedStatus === 0}
              onChange={()=>handleStatusUpdate(task, 0)}
            />
            To Do 
          </label>
          <label>
            <input
              type="radio"
              value={1}
              checked={selectedStatus === 1}
              onChange={()=>handleStatusUpdate(task, 1)}
            />
            On Going 
          </label>
          <label>
            <input
              type="radio"
              value={2}
              checked={selectedStatus === 2}
              onChange={()=>handleStatusUpdate(task, 2)}
            />
            Done
          </label>
          </div></td>
        <td>{task.user}</td>
        <td>{task.startDate.toLocaleDateString()}</td>
        <td><button className="logout-button" onClick={() => handleDeleteTask(task.name)}>Delete</button></td>

      </tr>
    </tbody>
  </table>
</div>
        ))}
      </div>
      <input className="input"
            type="text"
            placeholder="Find task"
            value={taskToFind}
            onChange={handleFindTasK}
          />
      <div>
        <h2>Task founded</h2>
        {taskList.map((task, index) => (
          <div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Task Description</th>
        <th>Status</th>
        <th>User Creator</th>
        <th>Creation Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>{task.status}</td>
        <td>{task.user}</td>
        <td>{task.startDate.toLocaleDateString()}</td>

      </tr>
    </tbody>
  </table>
</div>
        ))}
      </div>
      
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
