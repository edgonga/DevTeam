import React from "react";

const TaskItem = ({ task }) => {
  return (
    <div>
      <p>Task Name: {task.name}</p>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>User Creator: {task.user}</p>
      <p>Date of Creation: {task.startDate.toLocaleDateString()}</p>
    </div>
  );
};

export default TaskItem;
