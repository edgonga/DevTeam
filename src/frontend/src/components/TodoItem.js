import React from "react";

const TaskItem = ({ task }) => {
  return (
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
        <td>${task.name}</td>
        <td>${task.description}</td>

      </tr>
    </tbody>
  </table>
</div>

  );
};

export default TaskItem;
