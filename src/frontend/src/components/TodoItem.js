import React from "react";

const TaskItem = ({ task }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto",
        gridColumnGap: "10px",
      }}
    >
      <div>{task.taskName}</div>
      <div>{task.description}</div>
      <div>{task.status}</div>
      <div>{task.createdBy}</div>
      <div>{task.createdDate}</div>
    </div>
  );
};

export default TaskItem;
