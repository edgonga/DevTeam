import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
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

  const handleLogout = () => {
    // TODO: Perform logout logic
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Tasks list</h2>
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
          <button type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </form>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>User Creator</th>
              <th>Date of Creation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.user}</td>
                <td>{task.startDate.toLocaleDateString()}</td>
                <td>
                  {task.status === "PENDING" && (
                    <>
                      <button onClick={() => handleStatusUpdate(task, "TO_DO")}>To Do</button>
                      <button onClick={() => handleStatusUpdate(task, "ON_GOING")}>On Going</button>
                      <button onClick={() => handleStatusUpdate(task, "DONE")}>Done</button>
                    </>
                  )}
                  <button onClick={() => handleDeleteTask(task.name)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
