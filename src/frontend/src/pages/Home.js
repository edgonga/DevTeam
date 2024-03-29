import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: { userName } = {} } = location;
  const [selectedStatus, setSelectedStatus] = useState("TO DO");
  const [taskToFind, setFindTask] = useState("");
  const [getAllTask, setGetAllTask] = useState("")

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
        const updatedTaskList = taskList.filter(
          (task) => task.name !== taskName
        );
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
    const newStatusSelected = newStatus;
    setSelectedStatus(newStatusSelected);

    try {
      const response = await fetch(
        "http://localhost:8000/updateTask/" + task.name,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            name: task.name,
            description: task.description,
          }),
        }
      );

      if (response.ok) {
        const updatedTaskList = taskList.map((e) => {
          if (e.name === task.name) {
            console.log(e);
            return {
              name: e.name,
              description: e.description,
              status: newStatus,
              startDate: e.startDate,
              user: e.user,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleFindTaskChange = (e) => {
    setFindTask(e.target.value);
  };

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchFilteredTask = async () => {
      try {
        if (!taskToFind) {
          setTask(null);
          return;
        }

        const response = await fetch("http://localhost:8000/findTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: taskToFind,
          }),
        });

        if (response.ok) {
          const filteredTask = await response.json();
          setTask(filteredTask);
          console.log("found task -> ", filteredTask);
        } else {
          console.log("Error finding task:", response.status);
        }
      } catch (error) {
        console.log("Error finding task:", error);
        window.alert("Error finding task. Please try again.");
      }
    };

    fetchFilteredTask();
  }, [taskToFind]);

  const handleGetAllTask = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllTask", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const allTasks = await response.json();
        //setGetAllTask(allTasks);
        console.log("All tasks -> ", allTasks);

        const jsonString = JSON.stringify(allTasks, null, 2)
        const blob = new Blob([jsonString], {type: "application/json"})
        const url = URL.createObjectURL(blob)

        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "allTasks.json"; 
        document.body.appendChild(downloadLink);
        downloadLink.click();
  
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);

      } else {
        console.log("Error in retrieving all tasks: ", response.status);
      };
  } catch (error) {
    console.log("Error finding all task:", error);
    window.alert("Error finding all task. Please try again.");
  }}

  const handleLogout = () => {
    // TODO: Perform logout logic
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Create your task!</h2>
        <form className="form-input">
          <input
            className="input"
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <input
            className="input"
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
          <div className="table-container">
            <table className="table">
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
                  <td>
                    <label>
                      <input
                        type="radio"
                        value="TO DO"
                        checked={selectedStatus === "TO DO"}
                        onChange={() => handleStatusUpdate(task, "TO DO")}
                      />
                      To Do
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="PENDING"
                        checked={selectedStatus === "PENDING"}
                        onChange={() => handleStatusUpdate(task, "PENDING")}
                      />
                      Pending
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="DONE"
                        checked={selectedStatus === "DONE"}
                        onChange={() => handleStatusUpdate(task, "DONE")}
                      />
                      Done
                    </label>
                  </td>
                  <td>{task.user}</td>
                  <td>{task.startDate.toLocaleDateString()}</td>
                  <td>
                    <button
                      className="logout-button"
                      onClick={() => handleDeleteTask(task.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <input
        className="input"
        type="text"
        placeholder="Find task"
        value={taskToFind}
        onChange={handleFindTaskChange}
      />
      <div>
        <h2>Task found</h2>
        {task ? (
          <div className="table-container">
            <table className="table">
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
                  <td>{task.taskName}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.status.status}</td>
                  <td>{task.userTaskCreator}</td>
                  <td>{formatDate(task.startDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>No matching task found.</p>
        )}
      </div>
      <button className="get-all-tasks-button" onClick={handleGetAllTask}>
      Get all Tasks
      </button>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Home;
